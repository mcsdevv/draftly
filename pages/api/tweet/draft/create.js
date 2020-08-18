import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";
import { query } from "@lib/api/db";
import { v4 as uuidv4 } from "uuid";
const sql = require("sql-query");
const sqlQuery = sql.Query();

const createDraftTweet = async (req, res, uid, tuid) => {
  const { metadata, title, tweet } = JSON.parse(req.body);
  const sqlInsert = sqlQuery.insert();

  // * Error if either tweet or title are missing
  if (!title) throw "Malformed request - missing title";
  if (!tweet) throw "Malformed request - missing tweet";

  // * Format draft insert query
  const twuid = uuidv4();
  const draft = {
    twuid,
    tuid,
    type: "draft",
    text: tweet,
    title,
    created_by: uid,
    favorites: 0,
    replies: 0,
    retweets: 0,
    tweet_id: "",
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
  res.status(200).json({
    ...draft,
    created_at: Date.now(),
    updated_at: Date.now(),
    metadata: meta,
  });
};

export default verify(withSentry(createDraftTweet));
