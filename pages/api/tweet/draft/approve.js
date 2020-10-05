// * Libraries
import prisma from "@lib/api/db/prisma";
import { v4 as uuidv4 } from "uuid";

// * Middleware
import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";

const approveDraftTweet = async (req, res, uid) => {
  const { twuid } = JSON.parse(req.body);
  const tauid = uuidv4();

  // * Get the list of tweet approvals
  const approvals = await prisma.approvals.findMany({
    where: { twuid },
  });

  // * If already approved by user, return error
  if (approvals.find((a) => a.uid === uid)) {
    console.log("User has already approved tweet.");
    return res.status(403).send("User has already approved tweet.");
  }

  // * Insert approval
  await prisma.approvals.create({
    data: {
      tauid,
      uid,
      tweet: { connect: { twuid } },
    },
  });

  console.log("Approved tweet:", twuid);
  res.status(200).json({ tauid, twuid, uid });
};

export default verify(withSentry(approveDraftTweet));
