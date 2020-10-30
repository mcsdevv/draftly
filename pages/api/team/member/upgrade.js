// * Libraries
import prisma from "@lib/api/db/prisma";

// * Middleware
import isOwner from "@lib/api/middleware/isOwner";
import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";

const memberUpgrade = async (req, res, _uid, _tuid) => {
  const { tmuid } = JSON.parse(req.body);

  // * Delete team member
  const owner = await prisma.members.update({
    where: { tmuid },
    data: { role: "owner" },
    include: { user: true },
  });

  console.log("Upgraded team member:", tmuid);
  res.status(200).json(owner);
};

export default verify(isOwner(withSentry(memberUpgrade)));
