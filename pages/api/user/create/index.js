import { client, q } from "../../_util/fauna";
import verify from "../../_util/token/verify";

export default async (req, res) => {
  verify(req.headers.authorization, async error => {
    console.log("TOKEN", req.headers.authorization);
    if (error) res.status(400).json({ error });
    const { email, name, picture } = req.body;
    try {
      const dbs = await client.query(
        q.Create(q.Collection("users"), {
          data: {
            email,
            name,
            picture,
            plan: "free",
            scopes: [
              {
                name,
                role: "owner",
                type: "account"
              }
            ]
          }
        })
      );
      // ok
      res.status(200).json(dbs.data);
    } catch (e) {
      // something went wrong
      res.status(500).json({ error: e.message });
    }
  });
};
