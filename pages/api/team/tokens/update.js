import { client, q } from "../../_util/fauna";
import { getDocByIndex } from "../../_util/fauna/queries";
import verify from "../../_util/token/verify";

const updateTokens = async (req, res) => {
  try {
    const { handle, tokenKey, tokenSecret } = req.body;
    // * Update team tokens
    const dbs = await client.query(
      q.Update(
        q.Select(["ref"], getDocByIndex("all_teams_by_handle", handle)),
        {
          data: {
            auth: {
              tokenKey,
              tokenSecret,
            },
          },
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
