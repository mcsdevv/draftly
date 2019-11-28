import { client, q } from "../../_util/fauna";

export default async (req, res) => {
  const { email, name } = req.body;
  console.log("CREATING SCOPE...");
  // ! Currently overrides all scopes instead of merging
  try {
    const dbs = await client.query(
      q.Update(
        q.Select(["ref"], q.Get(q.Match(q.Index("all_users_by_email"), email))),
        {
          data: {
            scopes: [
              {
                name,
                role: "owner",
                type: "team"
              }
            ]
          }
        }
      )
    );
    // ok
    res.status(200).json(dbs.data);
  } catch (e) {
    // something went wrong
    res.status(500).json({ error: e.message });
  }
};
