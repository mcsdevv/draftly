import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";
import { escape, query } from "@lib/api/db";

const deleteDraftTweet = async (req, res) => {
  const { twuid } = JSON.parse(req.body);

  // * Delete draft tweet
  await query(escape`DELETE FROM tweets WHERE twuid = ${twuid}`);

  // * Delete draft tweet meta
  await query(escape`DELETE FROM tweets_meta WHERE twuid = ${twuid}`);

  console.log("Deleted tweet:", twuid);
  res.status(200).json(twuid);
};

export default verify(withSentry(deleteDraftTweet));
