import { client, q } from "../../_util/fauna";

export default async (req, res) => {
  const { email } = req.query;
  try {
    const exists = await client.query(
      q.Exists(q.Match(q.Index("all_users_by_email"), email))
    );
    console.log("Does user exist?", exists);
    // ok
    res.status(200).json({ existss });
  } catch (e) {
    // something went wrong
    res.status(500).json({ error: e.message });
  }
};
