// * Libraries
import prisma from "@lib/api/db/prisma";

// * Middleware
import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";
import isMember from "@lib/api/middleware/isMember";

const getSingleTweet = async (req, res, _uid, _tuid) => {
  const { twuid } = req.query;

  // * Get tweet from table
  const tweet = await prisma.tweets.findOne({
    where: { twuid },
    include: {
      approvals: true,
      comments: true,
      metadata: true,
    },
  });

  console.log("Retrieved tweet:", twuid);
  res.status(200).json({ tweet });
};

export default verify(isMember(withSentry(getSingleTweet)));
