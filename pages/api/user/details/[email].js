import { client, q } from "../../_util/fauna";
import verify from "../../_util/token/verify";

export default async (req, res) => {
  verify(req.headers.authorization || req.cookies.access_token, async error => {
    if (error) res.status(400).json({ error });
    const { email } = req.query;
    // TODO Throws if no teams present - big problem...
    // If teams length > 0 - get teams, else empty object
    try {
      const dbs = await client.query(
        q.Drop(
          2,
          q.Union(
            q.ToArray(q.Get(q.Match(q.Index("all_users_by_email"), email))),
            q.Map(
              q.Select(
                ["data", "teams"],
                q.Get(q.Match(q.Index("all_users_by_email"), email))
              ),
              q.Lambda("s", q.Get(q.Ref(q.Collection("teams"), q.Var("s"))))
            )
          )
        )
      );
      const userData = dbs[0];
      const teamsData = dbs.slice(1);
      userData.shift();
      const user = userData.shift();
      console.log("User details:", user);
      const teams = teamsData.map(t => t.data);
      console.log("Teams details", teams);
      // ok
      res.status(200).json({ user, teams });
    } catch (e) {
      console.log("uh oh", e.message);
      // something went wrong
      res.status(500).json({ error: e.message });
    }
  });
};
