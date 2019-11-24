import { client, q } from "../../_util/fauna";

export default async (req, res) => {
  const { email } = req.query;
  try {
    const user = await client.query(
      q.Get(q.Match(q.Index("all_users_by_email"), email))
    );
    console.log("User details:", user);
    // ok
    res.status(200).json({ ...user.data });
  } catch (e) {
    // something went wrong
    res.status(500).json({ error: e.message });
  }
};
