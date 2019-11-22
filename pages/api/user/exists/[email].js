import { client, q } from "../../_util/fauna";

export default async (req, res) => {
  const { email } = req.query;
  try {
    const dbs = await client.query(
      q.Exists(q.Match(q.Index("all_users_by_email"), email))
    );
    console.log("Does user exists?", dbs);
    // ok
    res.status(200).json({ exists: dbs });
  } catch (e) {
    // something went wrong
    res.status(500).json({ error: e.message });
  }
};
