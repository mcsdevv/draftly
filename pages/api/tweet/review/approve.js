import verify from "../../_util/token/verify";
import { escape, query } from "../../_util/db";

const approveReviewTweet = async (req, res, uid) => {
  try {
    const { twuid } = req.body;
    const tauid = uuidv4();

    // * Get the list of tweet approvals
    const approvalsQuery = await query(
      escape`SELECT * FROM tweets_approvals
      WHERE twuid = ${twuid}`
    );

    // *If already approved by user, return error
    if (approvalsQuery.find((a) => a.uid === uid)) {
      console.log("User has already approved tweet.");
      return res.status(403).send("User has already approved tweet.");
    }

    // * Insert approval
    await query(
      escape`INSERT INTO tweets_approvals (tauid, twuid, uid)
      VALUES (${tauid}, ${twuid}, ${uid})`
    );

    console.log("Approved tweet:", twuid);
    res.status(200).json(twuid);
  } catch (err) {
    console.error("ERROR - api/tweet/review/approve -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(approveReviewTweet);
