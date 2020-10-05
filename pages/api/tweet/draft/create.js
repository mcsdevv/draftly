// * Libraries
import prisma from "@lib/api/db/prisma";
import { v4 as uuidv4 } from "uuid";

// * Middleware
import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";
import isMember from "@lib/api/middleware/isMember";

const createDraftTweet = async (req, res, uid, tuid) => {
  const { metadata, title, tweet } = JSON.parse(req.body);

  // * Error if either tweet or title are missing
  if (!title) throw new Error("Malformed request - missing title");
  if (!tweet) throw new Error("Malformed request - missing tweet");

  // * Generate unique id set
  const twuid = uuidv4();
  const twmuid = uuidv4();

  // * Insert draft
  const draft = await prisma.tweets.create({
    data: {
      twuid,
      type: "draft",
      text: tweet,
      title,
      createdBy: uid,
      favorites: 0,
      replies: 0,
      retweets: 0,
      tweetId: "",
      team: { connect: { tuid } },
      metadata: { create: { twmuid, ...metadata } },
    },
    include: { metadata: true },
  });

  console.log("Draft tweet created for:", tuid);
  res.status(200).json({
    ...draft,
  });
};

export default verify(isMember(withSentry(createDraftTweet)));
