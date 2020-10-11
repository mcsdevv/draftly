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

  // // * Update meta
  // await prisma.metadata.update({
  //   where: { twuid },
  //   data: metadata,
  // });

  console.log("Updated draft tweet:", twuid);
  res.status(200).json({ twuid, ...metadata });
};

export default verify(isMember(withSentry(updateDraftTweet)));
