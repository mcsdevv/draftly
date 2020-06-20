import verify from "@lib/api/token/verify";
import { escape, query } from "@lib/api/db";

const updateUserName = async (req, res, uid) => {
  try {
    const { name } = JSON.parse(req.body);

    console.log("NEW NAME", name);

    // * Update user name
    await query(escape`UPDATE users SET name = ${name} WHERE uid = ${uid}`);

    console.log("User name updated:", uid);
    res.status(200).send(name);
  } catch (err) {
    console.error("ERROR - api/user/update/name -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(updateUserName);
