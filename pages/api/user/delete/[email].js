import { client, q } from "../../_util/fauna";
import { getDocRef } from "../../_util/fauna/queries";
import verify from "../../_util/token/verify";

const deleteUser = async (req, res) => {
  try {
    const { teams } = JSON.parse(req.body);
    // * Delete user
    const dbs = await client.query(
      q.Delete(getDocRef("users", req.cookies.user_id))
    );
    // * List teams to delete if no owners remain after user deletion
    const teamsToDelete = [];
    teams.forEach((t) => {
      if (t.owners.length <= 1 && t.owners.includes(req.cookies.user_id)) {
        teamsToDelete.push(t.handle);
      }
    });
    console.log("GOT TEAMS", teamsToDelete);
    // * Delete teams with no remaining owners
    await client.query(
      q.Foreach(
        q.Paginate(
          q.Union(
            q.Map(
              teamsToDelete,
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
    // TODO Remove user from all teams even when an owner remains
    console.log("Deleted user:", dbs.data.name);
    res.status(200).json(dbs.data);
  } catch (err) {
    console.error("ERROR - api/user/delete -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(deleteUser);
