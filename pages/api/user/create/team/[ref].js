import { client, q } from "../../../_util/fauna";
import verify from "../../../_util/token/verify";

export default async (req, res) => {
  verify(req.headers.authorization || req.cookies.access_token, async error => {
    if (error) res.status(400).json({ error });
    const { email } = req.body;
    const { ref } = req.query;
    try {
      // * Add team to user
      await client.query(
        q.Update(
          q.Select(
            ["ref"],
            q.Get(q.Match(q.Index("all_users_by_email"), email))
          ),
          {
            data: {
              teams: q.Append(
                ref,
                q.Select(
                  ["data", "teams"],
                  q.Get(q.Match(q.Index("all_users_by_email"), email))
                )
              )
            }
          }
        )
      );
      console.log("Added new team to user: ", ref);
      res.status(200).json({ update: true });
    } catch (e) {
      console.log("ERROR - api/user/create/team -", e.message);
      res.status(500).json({ error: e.message });
    }
  });
};
