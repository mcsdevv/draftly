import { client } from "../../_util/fauna";
import { getDocByIndex } from "../../_util/fauna/queries";
import verify from "../../_util/token/verify";

const teamDetails = async (req, res) => {
  try {
    const { handle } = req.query;
    // * Get details for a team
    const dbs = await client.query(
      getDocByIndex("all_teams_by_handle", handle)
    );
    // * Delete keys before sending response
    delete dbs.data.auth;
    console.log("Team details:", dbs);
    res.status(200).json(dbs.data);
  } catch (err) {
    console.error("ERROR - api/team/details -", err.message);
    res.status(500).json({ error: err.message });
  }
};

export default verify(teamDetails);
