import { client, q } from "../../_util/fauna";

export default async (req, res) => {
  const { email, name, picture } = req.body;
  try {
    const dbs = await client.query(
      q.Create(q.Collection("users"), {
        data: {
          email,
          name,
          picture,
          plan: "free",
          contexts: [
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
};
