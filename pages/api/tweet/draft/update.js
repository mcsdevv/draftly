import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";
import { escape, query } from "@lib/api/db";
const sql = require("sql-query");
const sqlQuery = sql.Query();

const updateDraftTweet = async (req, res) => {
  const { metadata, text, twuid } = JSON.parse(req.body);
  const sqlUpdate = sqlQuery.update();

  // * Update draft tweet
  await query(escape`UPDATE tweets SET text=${text} WHERE twuid=${twuid}`);

  console.log("META", metadata);

  // * Format meta
  const meta = { twuid, ...metadata };

  // * Insert meta
  const metaQuery = sqlUpdate.into("tweets_meta").set(meta).build();
  await query(metaQuery);

  console.log("Updated draft tweet:", twuid);
  res.status(200).json(meta);
};

export default verify(withSentry(updateDraftTweet));
