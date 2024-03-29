// * Libraries
import prisma from "@lib/api/db/prisma";
import { v4 as uuidv4 } from "uuid";

// * Middleware
import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";
import isMember from "@lib/api/middleware/isMember";

const createDraftTweet = async (req, res, uid, tuid) => {
  const { metadata, campaign, tweet } = JSON.parse(req.body);

  // * Error if either tweet or campaign are missing
  if (!campaign) throw new Error("Malformed request - missing campaign");
  if (!tweet) throw new Error("Malformed request - missing tweet");

  // * Generate unique id for tweet
  const twuid = uuidv4();

  // * Insert draft
  const draft = await prisma.tweets.create({
    data: {
      twuid,
      type: "draft",
      text: tweet,
      campaign,
      tweetId: "",
      creator: {
        connect: {
          uid,
        },
      },
      team: { connect: { tuid } },
      metadata: metadata
        ? {
            connectOrCreate: { where: { url: metadata.url }, create: metadata },
          }
        : undefined,
    },
    include: { approvals: true, comments: true, creator: true, metadata: true },
  });

  console.log("Draft tweet created for:", tuid);
  res.status(200).json({
    ...draft,
  });
};

export default verify(isMember(withSentry(createDraftTweet)));
