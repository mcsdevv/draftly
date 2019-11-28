import { client, q } from "../../_util/fauna";

export default async (req, res) => {
  const { handle, tokenKey, tokenSecret } = req.body;
  console.log(handle, tokenKey, tokenSecret);
  try {
    const dbs = await client.query(
      q.Update(
        q.Select(
          ["ref"],
          q.Get(q.Match(q.Index("all_teams_by_handle"), handle))
        ),
        {
          data: {
            auth: {
              tokenKey,
              tokenSecret
            }
          }
        }
      )
    );
    // ok
    console.log("TOKENS UPDATED FOR", handle);
    res.status(200).json(dbs.data);
  } catch (e) {
    // something went wrong
    res.status(500).json({ error: e.message });
  }
};
