import { v4 as uuidv4 } from "uuid";
import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";
import { escape, query } from "@lib/api/db";

const createTweetComment = async (req, res, uid) => {
  const { comment, twuid } = JSON.parse(req.body);

  const tcuid = uuidv4();

  // * Insert comment
  const commentInserted = await query(
    escape`INSERT INTO tweets_comments (added_by, comment, tcuid, twuid)
    VALUES (${uid}, ${comment}, ${tcuid}, ${twuid});
    SELECT * FROM tweets_comments WHERE tcuid=${tcuid}`
  );

  console.log("Added comment to:", twuid);
  res.status(200).json(...commentInserted[1]);
};

export default verify(withSentry(createTweetComment));
