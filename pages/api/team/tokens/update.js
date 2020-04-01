import { client, q } from "../../_util/fauna";
import verify from "../../_util/token/verify-new";

const updateTokens = async (req, res) => {
  const { handle, tokenKey, tokenSecret } = req.body;
  try {
    // * Update team tokens
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
    console.log("Tokens updated for:", handle);
    res.status(200).json(dbs.data);
  } catch (err) {
    console.error("ERROR - api/team/tokens/update -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(updateTokens);
