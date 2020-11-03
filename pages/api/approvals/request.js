// * Libraries
import prisma from "@lib/api/db/prisma";
import { v4 as uuidv4 } from "uuid";

// * Middleware
import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";

const createApprovalRequest = async (req, res) => {
  const { uid, twuid } = JSON.parse(req.body);

  const tauid = uuidv4();

  // TODO EMAIL USER WITH REQUEST

  // * Create request
  const approvalRequested = await prisma.approvals.create({
    data: {
      tauid,
      uid,
      state: "requested",
      tweet: { connect: { twuid } },
    },
    select: {
      tweet: {
        include: {
          approvals: true,
          comments: { include: { addedBy: true } },
          creator: true,
          metadata: true,
        },
      },
    },
  });

  console.log("Approval requested from:", uid);
  res.status(200).json(approvalRequested);
};

export default verify(withSentry(createApprovalRequest));
