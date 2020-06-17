import verify from "@lib/api/token/verify";
import { query } from "@lib/api/db";
const sql = require("sql-query");
const sqlQuery = sql.Query();

const createTweetComment = async (req, res, uid) => {
  try {
    const comment = JSON.parse(req.body);
    const sqlInsert = sqlQuery.insert();

    // * Insert comment
    const commentQuery = sqlInsert
      .into("tweets_comments")
      .set({ ...comment, added_by: uid })
      .build();
    await query(commentQuery);

    console.log("Added comment to:", comment.twuid);
    res.status(200).json(comment);
  } catch (err) {
    console.error("ERROR - api/tweet/comment/create -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(createTweetComment);
