import { client, q } from "../../_util/fauna";
const verify = require("../../_util/token/verify");

export default async (req, res) => {
  console.log("HEADERRRR", req.cookies.access_token);
  verify(req.headers.authorization || req.cookies.access_token, async error => {
    console.log("USER DETAILS TOKEN", req.headers.authorization);
    if (error) res.status(400).json({ error });
    const { email } = req.query;
    try {
      const user = await client.query(
        q.Get(q.Match(q.Index("all_users_by_email"), email))
      );
      console.log("User details:", user);
      // ok
      res.status(200).json({ ...user.data });
    } catch (e) {
      // something went wrong
      res.status(500).json({ error: e.message });
    }
  });
};
