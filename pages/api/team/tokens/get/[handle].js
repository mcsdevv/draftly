import { client, q } from "../../../_util/fauna";
import verify from "../../../_util/token/verify-new";

const getTeamTokens = async (req, res) => {
  const { handle } = req.query;
  try {
    // * Get auth tokens for account
    const dbs = await client.query(
      q.Get(q.Match(q.Index("all_teams_by_handle"), handle))
    );
    console.log("Retrieved tokens for:", handle);
    res.status(200).json(dbs.data.auth);
  } catch (err) {
    console.log("ERROR - api/team/tokens/get -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(getTeamTokens);
