// * Libraries
import prisma from "@lib/api/db/prisma";

// * Middleware
import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";
import isMember from "@lib/api/middleware/isMember";

const updateDraftTweet = async (req, res) => {
  const { campaign, metadata, text, twuid } = JSON.parse(req.body);

  // * Update draft tweet
  const draft = await prisma.tweets.update({
    where: { twuid },
    data: {
      campaign,
      text,
      metadata: metadata ? { connect: { url: metadata?.url } } : undefined,
    },
    include: {
      approvals: true,
      comments: { include: { addedBy: true } },
      creator: true,
      metadata: true,
    },
  });

  console.log("Updated draft tweet:", twuid);
  res.status(200).json(draft);
};

export default verify(isMember(withSentry(updateDraftTweet)));
