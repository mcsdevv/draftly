import verify from "@lib/api/token/verify";
import { escape, query } from "@lib/api/db";
import uuidv4 from "uuid/v4";
const sql = require("sql-query");
const sqlQuery = sql.Query();

const approveReviewTweet = async (req, res, uid) => {
  try {
    const { twuid } = JSON.parse(req.body);
    const tauid = uuidv4();
    const sqlInsert = sqlQuery.insert();

    // * Get the list of tweet approvals
    const approvalsQuery = await query(
      escape`SELECT * FROM tweets_approvals
      WHERE twuid = ${twuid}`
    );

    console.log("approvals list", approvalsQuery);

    // *If already approved by user, return error
    if (approvalsQuery.find((a) => a.uid === uid)) {
      console.log("User has already approved tweet.");
      return res.status(403).send("User has already approved tweet.");
    }

    // * Create approval object
    const approval = {
      tauid,
      twuid,
      uid,
    };

    // * Insert approval
    const approvalQuery = sqlInsert
      .into("tweets_approvals")
      .set(approval)
      .build();
    await query(approvalQuery);

    console.log("Approved tweet:", twuid);
    res.status(200).json(approval);
  } catch (err) {
    console.error("ERROR - api/tweet/review/approve -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(approveReviewTweet);
