// * Libraries
import prisma from "@lib/api/db/prisma";
import { v4 as uuidv4 } from "uuid";

// * Middleware
import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";

const createTweetComment = async (req, res, uid) => {
  const { comment, twuid } = JSON.parse(req.body);

  const tcuid = uuidv4();

  // * Insert comment
  const commentInserted = await prisma.tweets_comments.create({
    data: {
      addedBy: uid,
      comment,
      tcuid,
      twuid,
    },
  });

  console.log("Added comment to:", twuid);
  res.status(200).json(...commentInserted);
};

export default verify(withSentry(createTweetComment));
