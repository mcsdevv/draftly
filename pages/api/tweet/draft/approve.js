import { v4 as uuidv4 } from "uuid/v4";
import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";
import { escape, query } from "@lib/api/db";

const approveDraftTweet = async (req, res, uid) => {
  const { twuid } = JSON.parse(req.body);
  const tauid = uuidv4();

  // * Get the list of tweet approvals
  const approvalsQuery = await query(
    escape`SELECT * FROM tweets_approvals
      WHERE twuid = ${twuid}`
  );

  // * If already approved by user, return error
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
  res.status(200).json({ tauid, twuid, uid });
};

export default verify(withSentry(approveDraftTweet));
