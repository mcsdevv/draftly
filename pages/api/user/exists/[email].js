import { client, q } from "../../_util/fauna";
import verify from "../../_util/token/verify";

const userExists = async (req, res) => {
  try {
    const { email } = req.query;
    // * Establish whether the user exists already
    const exists = await client.query(
      q.Exists(q.Match(q.Index("all_users_by_email"), email))
    );
    console.log("Existing user: ", exists);
    res.status(200).json({ exists });
  } catch (err) {
    console.error("ERROR - api/user/exists -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(userExists);
