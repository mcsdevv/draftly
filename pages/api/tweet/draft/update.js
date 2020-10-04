// * Libraries
import prisma from "@lib/api/db/prisma";

// * Middleware
import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";
import isMember from "@lib/api/middleware/isMember";

const updateDraftTweet = async (req, res) => {
  const { metadata, text, twuid } = JSON.parse(req.body);

  // * Update draft tweet
  await prisma.tweets.update({
    where: { twuid },
    data: { text },
  });

  // * Format meta
  const meta = { twuid, ...metadata };

  // * Update meta
  await prisma.tweets_meta.update({
    where: { twuid },
    data: meta,
  });

  console.log("Updated draft tweet:", twuid);
  res.status(200).json(meta);
};

export default verify(isMember(withSentry(updateDraftTweet)));
