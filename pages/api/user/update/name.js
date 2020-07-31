import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";
import { escape, query } from "@lib/api/db";

const updateUserName = async (req, res, uid) => {
  const { name } = JSON.parse(req.body);

  // * Update user name
  await query(escape`UPDATE users SET name = ${name} WHERE uid = ${uid}`);

  console.log("User name updated:", uid);
  res.status(200).send(name);
};

export default verify(withSentry(updateUserName));
