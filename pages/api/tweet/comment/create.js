import verify from "@lib/api/token/verify";
import { query } from "@lib/api/db";
import uuidv4 from "uuid/v4";
const sql = require("sql-query");
const sqlQuery = sql.Query();

const createTweetComment = async (req, res, uid) => {
  try {
    const { comment, twuid } = JSON.parse(req.body);
    const sqlInsert = sqlQuery.insert();
    const tcuid = uuidv4();

    // * Format comment object
    const commentObject = {
      added_by: uid,
      ...comment,
      tcuid,
      twuid,
    };

    // * Insert comment
    const commentQuery = sqlInsert
      .into("tweets_comments")
      .set({ ...commentObject })
      .build();
    await query(commentQuery);

    console.log("Added comment to:", comment.twuid);
    res.status(200).json({ ...commentObject });
  } catch (err) {
    console.error("ERROR - api/tweet/comment/create -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(createTweetComment);
