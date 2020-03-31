import { client, q } from "../../_util/fauna";
import verify from "../../_util/token/verify-new";

const teamsDelete = async (req, res) => {
  const { teams } = req.body;
  try {
    // * Delete multiple teams
    const dbs = await client.query(
      q.Foreach(
        q.Paginate(
          q.Union(
            q.Map(
              teams,
              q.Lambda(
                "x",
                q.Match(q.Index("all_teams_by_handle"), [q.Var("x")])
              )
            )
          )
        ),
        q.Lambda("u", q.Delete(q.Var("u")))
      )
    );
    console.log("Deleted teams: ", teams);
    res.status(200).json(dbs.data);
  } catch (err) {
    console.log("ERROR - api/teams/delete/delete -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(teamsDelete);
