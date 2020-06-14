import verify from "../../_util/token/verify";
import { query } from "../../_util/db";
const escape = require("sql-template-strings");

const approveReviewTweet = async (req, res, uid) => {
  try {
    const { twuid } = req.body;
    const tauid = uuidv4();

    // TODO Check no previous approval - may not be required?

    // * Insert approval
    await query(
      escape`INSERT INTO tweets_approvals (tauid, twuid, uid)
      VALUES (${tauid}, ${twuid}, ${uid})`
    );

    console.log("Approved tweet:", twuid);
    res.status(200).json({ ...dbs.data, ref, updated: dbs.ts });
  } catch (err) {
    console.error("ERROR - api/tweet/review/approve -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(approveReviewTweet);
