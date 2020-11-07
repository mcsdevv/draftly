// * Libraries
import prisma from "@lib/api/db/prisma";

// * Middleware
import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";

const deleteApprovalRequest = async (req, res) => {
  const { tauid, twuid } = JSON.parse(req.body);

  console.log(tauid, twuid);

  // * Delete approval
  const approvalDeleted = await prisma.approvals.delete({
    where: {
      tauid_twuid: {
        tauid,
        twuid,
      },
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

  console.log("Approval deleted:", tauid);
  res.status(200).json(approvalDeleted);
};

export default verify(withSentry(deleteApprovalRequest));
