import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";
import { escape, query } from "@lib/api/db";

const deletePublishedTweet = async (req, res) => {
  const { twuid } = JSON.parse(req.body);

  // * Delete published tweet and meta
  await query(escape`DELETE FROM tweets WHERE twuid = ${twuid};
              DELETE FROM tweets_meta WHERE twuid = ${twuid}`);

  console.log("Deleted tweet:", twuid);
  res.status(200).json(twuid);
};

export default verify(withSentry(deletePublishedTweet));
