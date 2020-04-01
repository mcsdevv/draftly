import { client, q } from "../../_util/fauna";
import request from "request-promise";
import verify from "../../_util/token/verify-new";

const deleteUser = async (req, res) => {
  try {
    const { teams } = JSON.parse(req.body);
    const { email } = req.query;
    // * Delete user
    const dbs = await client.query(
      q.Delete(
        q.Select(["ref"], q.Get(q.Match(q.Index("all_users_by_email"), email)))
      )
    );
    // * List teams to delete if no owners remain after user deletion
    const teamsToDelete = [];
    teams.forEach(t => {
      if (t.owners.length <= 1 && t.owners.includes(email)) {
        teamsToDelete.push(t.handle);
      }
    });
    // * Delete teams with no remaining owners
    const deleteOptions = {
      method: "DELETE",
      url: `${process.env.AUTH0_REDIRECT_URI}/api/teams/delete`,
      body: {
        teams: teamsToDelete
      },
      headers: {
        Authorization: req.headers.authorization || req.cookies.access_token
      },
      json: true
    };
    await request(deleteOptions);
    console.log("Deleted user: ", dbs.data.name);
    res.status(200).json(dbs.data);
  } catch (err) {
    console.error("ERROR - api/user/delete -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(deleteUser);
