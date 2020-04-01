import { client, q } from "../../../_util/fauna";
import verify from "../../../_util/token/verify-new";

const deleteUserTeams = async (req, res) => {
  try {
    const { emails } = req.body;
    const { ref } = req.query;
    // * Remove team from all users
    const dbs = await client.query(
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
                q.Lambda("s", q.Not(q.Equals(ref, q.Var("s"))))
              )
            }
          })
        )
      )
    );
    console.log("Removed team for all users: ", ref);
    res.status(200).json(dbs.data);
  } catch (err) {
    console.error("ERROR - api/users/delete/team -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(deleteUserTeams);
