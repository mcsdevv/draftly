import { client, q } from "../../_util/fauna";
import verify from "../../_util/token/verify";

export default async (req, res) => {
  verify(req.headers.authorization, async error => {
    if (error) res.status(400).json({ error });
    const { email } = req.query;
    try {
      // * Establish whether the user exists already
      const exists = await client.query(
        q.Exists(q.Match(q.Index("all_users_by_email"), email))
      );
      console.log("Existing user: ", exists);
      res.status(200).json({ exists });
    } catch (e) {
      console.log("ERROR - api/user/exists -", e.message);
      res.status(500).json({ error: e.message });
    }
  });
};
