import verify from "../../_util/token/verify";
import { escape, query } from "../../_util/db";
const sql = require("sql-query");
const sqlQuery = sql.Query();

const updateReviewTweet = async (req, res) => {
  try {
    const { metadata, text, twuid } = JSON.parse(req.body);
    const sqlUpdate = sqlQuery.update();

    // TODO Reset approvals

    // * Update draft tweet
    await query(escape`UPDATE tweets SET text=${text} WHERE twuid=${twuid}`);

    // * Format meta
    const meta = { twuid, ...metadata };

    // * Insert meta
    const metaQuery = sqlUpdate.into("tweets_meta").set(meta).build();
    await query(metaQuery);

    console.log("Updated review tweet:", twuid);
    res.status(200).json({ ...dbs.data, ref, updated: dbs.ts });
  } catch (err) {
    console.error("ERROR - api/tweet/review/update -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(updateReviewTweet);
