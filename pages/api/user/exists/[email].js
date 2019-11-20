import { client, q } from "../../_util/fauna";

export default async (req, res) => {
  const { email } = req.query;
  try {
    const dbs = await client.query(
      q.Get(q.Match(q.Index("all_users_by_email"), email))
    );
    // ok
    res.status(200).json(dbs.data);
  } catch (e) {
    // something went wrong
    res.status(500).json({ error: e.message });
  }
};

// ! Will throw a 500 instance not found if no matches
