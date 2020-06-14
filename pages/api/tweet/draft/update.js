import verify from "../../_util/token/verify";
import { query } from "../../_util/db";
const escape = require("sql-template-strings");
const sql = require("sql-query");
const sqlQuery = sql.Query();

const updateDraftTweet = async (req, res) => {
  try {
    const { metadata, text, twuid } = JSON.parse(req.body);
    const sqlUpdate = sqlQuery.update();

    // * Update draft tweet
    await query(escape`UPDATE tweets SET text=${text} WHERE twuid=${twuid}`);

    // * Format meta
    const meta = { twuid, ...metadata };

    // * Insert meta
    const metaQuery = sqlUpdate.into("tweets_meta").set(meta).build();
    await query(metaQuery);

    console.log("Updated draft tweet:", twuid);
    res.status(200).json({ ...dbs.data, ref, updated: dbs.ts });
  } catch (err) {
    console.error("ERROR - api/tweet/draft/update -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(updateDraftTweet);
