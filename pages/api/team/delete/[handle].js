import { client, q } from "../../_util/fauna";
import { getRef } from "../../_util/getRef";
import verify from "../../_util/token/verify";
import isOwner from "../../_util/middleware/isOwner";

const teamDelete = async (req, res) => {
  try {
    const { handle } = req.query;
    // * Delete a team
    const dbs = await client.query(
      q.Delete(
        q.Select(
          ["ref"],
          q.Get(q.Match(q.Index("all_teams_by_handle"), handle))
        )
      )
    );
    const { data, ref } = await dbs;
    const refJoined = getRef(ref);
    const emails = [...data.members, ...data.owners];
    // * Remove team from all users
    await client.query(
      q.Foreach(
        q.Paginate(
          q.Union(
            q.Map(
              emails,
              q.Lambda(
                "x",
                q.Match(q.Index("all_users_by_email"), [q.Var("x")])
              )
            )
          )
        ),
        q.Lambda(
          "u",
          q.Update(q.Var("u"), {
            data: {
              teams: q.Filter(
                q.Select(["data", "teams"], q.Get(q.Var("u"))),
                q.Lambda("s", q.Not(q.Equals(refJoined, q.Var("s"))))
              ),
            },
          })
        )
      )
    );
    console.log("Deleted team:", dbs.data.name);
    res.status(200).json(dbs.data);
  } catch (err) {
    console.error("ERROR - api/team/delete -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(isOwner(teamDelete));
