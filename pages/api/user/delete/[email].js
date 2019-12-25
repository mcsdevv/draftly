import { client, q } from "../../_util/fauna";
import request from "request-promise";
import verify from "../../_util/token/verify";

export default async (req, res) => {
  verify(req.headers.authorization || req.cookies.access_token, async error => {
    if (error) res.status(400).json({ error });
    const { teams } = JSON.parse(req.body);
    const { email } = req.query;
    try {
      const dbs = await client.query(
        q.Delete(
          q.Select(
            ["ref"],
            q.Get(q.Match(q.Index("all_users_by_email"), email))
          )
        )
      );
      const teamsToDelete = [];
      teams.forEach(t => {
        if (t.owners.length <= 1 && t.owners.includes(email)) {
          teamsToDelete.push(t.handle);
        }
      });
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
      console.log("Deleted user:", dbs.data.name);
      // ok
      res.status(200).json({ ...dbs.data });
    } catch (e) {
      // something went wrong
      res.status(500).json({ error: e.message });
    }
  });
};
