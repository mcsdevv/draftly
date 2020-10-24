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
  const commentInserted = await prisma.comments.create({
    data: {
      addedBy: { connect: { uid } },
      comment,
      tcuid,
      tweet: { connect: { twuid } },
    },
    include: { addedBy: true },
  });

  console.log("Added comment to:", twuid);
  res.status(200).json(commentInserted);
};

export default verify(withSentry(createTweetComment));
