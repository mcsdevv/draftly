import { client, q } from "../../_util/fauna";

export default async (req, res) => {
  const { email, name } = req.body;
  try {
    const dbs = await client.query(
      q.Update(q.Index("all_users_by_email"), email, {
        data: {
          scopes: {
            name,
            role: "owner",
            type: "team"
          }
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
