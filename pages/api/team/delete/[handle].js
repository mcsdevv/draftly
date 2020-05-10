import { client, q } from "../../_util/fauna";
import { getDocProperty, getDocByIndex } from "../../_util/fauna/queries";
import { getRef } from "../../_util/getRef";
import verify from "../../_util/token/verify";
import isOwner from "../../_util/middleware/isOwner";

const teamDelete = async (req, res) => {
  try {
    const { handle } = req.query;
    // * Delete a team
    const dbs = await client.query(
      q.Delete(
        getDocProperty(["ref"], getDocByIndex("all_teams_by_handle", handle))
      )
    );
    const { data, ref } = await dbs;
    const refJoined = getRef(ref);
    const refs = [...data.members, ...data.owners];
    // * Remove team from all users
    await client.query(
      q.Map(
        refs,
        q.Lambda(
          "u",
          q.Update(q.Ref(q.Collection("users"), q.Var("u")), {
            data: {
              teams: q.Filter(
                getDocProperty(
                  ["data", "teams"],
                  q.Get(q.Ref(q.Collection("users"), q.Var("u")))
                ),
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
    console.error("ERROR - api/team/delete -", err);
    res.status(500).json({ err: err.message });
  }
};

export default verify(isOwner(teamDelete));
