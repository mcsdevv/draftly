import { client, q } from "../../_util/fauna";
import verify from "../../_util/token/verify";

export default async (req, res) => {
  verify(req.headers.authorization, async error => {
    if (error) res.status(400).json({ error });
    const { email, name, picture } = req.body;
    try {
      // * Create user account
      const dbs = await client.query(
        q.Create(q.Collection("users"), {
          data: {
            email,
            name,
            picture,
            teams: []
          }
        })
      );
      console.log("User created: ", dbs.data);
      res.status(200).json(dbs.data);
    } catch (e) {
      console.log("ERROR - api/user/create -", e.message);
      res.status(500).json({ error: e.message });
    }
  });
};
