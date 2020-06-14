import verify from "../../_util/token/verify";
import { escape, query } from "../../_util/db";

const updateUserName = async (req, res, uid) => {
  try {
    const { newName } = JSON.parse(req.body);

    // * Update user name
    await query(escape`UPDATE user SET name=${newName} WHERE uid=${uid}`);

    console.log("User name updated:", uid);
    res.status(200).json(newName);
  } catch (err) {
    console.error("ERROR - api/user/update/name -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(updateUserName);
