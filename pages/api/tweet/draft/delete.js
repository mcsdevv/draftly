// * Libraries
import prisma from "@lib/api/db/prisma";

// * Middleware
import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";

const deleteDraftTweet = async (req, res) => {
  const { twuid } = JSON.parse(req.body);

  // * Delete draft tweet and meta
  await prisma.tweets.deleteMany({
    where: { twuid },
  });

  console.log("Deleted tweet:", twuid);
  res.status(200).json(twuid);
};

export default verify(withSentry(deleteDraftTweet));
