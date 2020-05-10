import { client } from "../../_util/fauna";
import { getDocByIndex } from "../../_util/fauna/queries";
import { getRef } from "../../_util/getRef";
import verify from "../../_util/token/verify";

const userExists = async (req, res) => {
  try {
    const { email } = req.query;
    // * Establish whether the user exists already
    const { ref } = await client.query(
      getDocByIndex("all_users_by_email", email)
    );
    const refTrimmed = getRef(ref);
    console.log("Existing user:", !!ref);
    res.status(200).json({ ref: refTrimmed });
  } catch (err) {
    console.error("ERROR - api/user/exists -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(userExists);
