import { client, q } from "../../_util/fauna";
import verify from "../../_util/token/verify";

export default async (req, res) => {
  verify(req.headers.authorization || req.cookies.access_token, async error => {
    if (error) res.status(400).json({ error });
    const { email } = req.query;
    try {
      // * Get user details along with teams they are part of
      const dbs = await client.query(
        q.Drop(
          2,
          q.Union(
            q.ToArray(q.Get(q.Match(q.Index("all_users_by_email"), email))),
            q.If(
              q.IsNonEmpty(
                q.Select(
                  ["data", "teams"],
                  q.Get(q.Match(q.Index("all_users_by_email"), email))
                )
              ),
              q.Map(
                q.Select(
                  ["data", "teams"],
                  q.Get(q.Match(q.Index("all_users_by_email"), email))
                ),
                q.Lambda("s", q.Get(q.Ref(q.Collection("teams"), q.Var("s"))))
              ),
              []
            )
          )
        )
      );
      // * Extract user and teams from db response
      const userData = dbs[0];
      const teamsData = dbs.slice(1);
      userData.shift();
      const user = userData.shift();
      const teams = teamsData.map(t => {
        delete t.data.auth;
        return t.data;
      });
      console.log("User details: ", user);
      console.log("Teams details: ", teams);
      res.status(200).json({ user, teams });
    } catch (e) {
      console.log("ERROR - api/user/details -", e.message);
      res.status(500).json({ error: e.message });
    }
  });
};
