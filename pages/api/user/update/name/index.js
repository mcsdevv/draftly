import { client, q } from "../../../_util/fauna";
import { getDocProperty, getDocByRef } from "../../../_util/fauna/queries";
import verify from "../../../_util/token/verify";

import { query } from "../../../_util/db";
const escape = require("sql-template-strings");

const updateUserName = async (req, res, uid) => {
  try {
    // * Update user name
    const { newName } = JSON.parse(req.body);
    const dbs = await client.query(
      q.Update(
        getDocProperty(["ref"], getDocByRef("users", req.cookies.user_id)),
        {
          data: {
            name: newName,
          },
        }
      )
    );

    const updateNameQuery = await query(
      escape`UPDATE user SET name=${newName} WHERE uid=${uid}`
    );

    console.log("User name updated:", dbs);
    res.status(200).json(dbs.data);
  } catch (err) {
    console.error("ERROR - api/user/update/name -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(updateUserName);
