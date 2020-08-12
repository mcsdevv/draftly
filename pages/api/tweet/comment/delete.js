import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";
import { escape, query } from "@lib/api/db";

const deleteComment = async (req, res) => {
  const { tcuid } = JSON.parse(req.body);

  // * Delete comment
  await query(escape`DELETE FROM tweets_comments WHERE tcuid = ${tcuid}`);

  console.log("Deleted comment:", tcuid);
  res.status(200).json({ tcuid });
};

export default verify(withSentry(deleteComment));
