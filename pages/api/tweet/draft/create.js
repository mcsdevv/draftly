import verify from "@lib/api/token/verify";
import { query } from "@lib/api/db";
import uuidv4 from "uuid/v4";
const sql = require("sql-query");
const sqlQuery = sql.Query();

const createDraftTweet = async (req, res, uid) => {
  try {
    const { metadata, tweet, tuid } = JSON.parse(req.body);
    const sqlInsert = sqlQuery.insert();

    // * Format draft insert query
    const twuid = uuidv4();
    const draft = {
      twuid,
      tuid,
      type: "draft",
      text: tweet,
      created_by: uid,
    };

    // * Insert draft
    const draftQuery = sqlInsert.into("tweets").set(draft).build();
    await query(draftQuery);

    // * Format meta insert query
    const twmuid = uuidv4();
    const meta = { twmuid, twuid, ...metadata };

    // * Insert meta
    const metaQuery = sqlInsert.into("tweets_meta").set(meta).build();
    await query(metaQuery);

    console.log("Draft tweet created for:", tuid);
    res.status(200).json(draft);
  } catch (err) {
    console.error("ERROR - api/tweet/draft/create -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(createDraftTweet);
