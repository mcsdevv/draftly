// * Libraries
import prisma from "@lib/api/db/prisma";

// * Middleware
import isOwner from "@lib/api/middleware/isOwner";
import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";

const memberDelete = async (req, res, _uid, tuid) => {
  const { tmuid } = JSON.parse(req.body);

  // * Delete team member
  await prisma.members.delete({
    where: { tmuid },
  });

  console.log("Deleted team member:", tmuid);
  res.status(200).send(tmuid);
};

export default verify(isOwner(withSentry(memberDelete)));
