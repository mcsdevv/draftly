import { client, q } from "../../../_util/fauna";
import verify from "../../../_util/token/verify";

const updateUserName = async (req, res) => {
  try {
    // * Update user name
    const { newName } = JSON.parse(req.body);
    const { email } = req.query;
    const dbs = await client.query(
      q.Update(
        q.Select(["ref"], q.Get(q.Match(q.Index("all_users_by_email"), email))),
        {
          data: {
            name: newName,
          },
        }
      )
    );
    console.log("User name updated: ", dbs);
    res.status(200).json(dbs.data);
  } catch (err) {
    console.error("ERROR - api/user/update/name -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(updateUserName);
