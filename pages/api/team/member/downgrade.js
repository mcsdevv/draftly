// * Libraries
import prisma from "@lib/api/db/prisma";

// * Middleware
import isOwner from "@lib/api/middleware/isOwner";
import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";

const memberDowngrade = async (req, res, _uid, _tuid) => {
  const { tmuid } = JSON.parse(req.body);

  // * Delete team member
  const member = await prisma.members.update({
    where: { tmuid },
    data: { role: "member" },
    include: { user: true },
  });

  console.log("Downgraded team member:", tmuid);
  res.status(200).json(member);
};

export default verify(isOwner(withSentry(memberDowngrade)));
