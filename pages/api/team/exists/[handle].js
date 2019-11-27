import { client, q } from "../../_util/fauna";

export default async (req, res) => {
  const { handle } = req.query;
  try {
    const exists = await client.query(
      q.Exists(q.Match(q.Index("all_teams_by_handle"), handle))
    );
    console.log("Does team exist?", exists);
    // ok
    res.status(200).json({ exists });
  } catch (e) {
    // something went wrong
    res.status(500).json({ error: e.message });
  }
};
