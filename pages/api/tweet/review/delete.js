import verify from "../../_util/token/verify";

import { query } from "../../_util/db";
const escape = require("sql-template-strings");

const deleteReviewTweet = async (req, res) => {
  try {
    const { twuid } = JSON.parse(req.body);

    // * Delete review tweet
    await query(escape`DELETE FROM tweets WHERE twuid = ${twuid}`);

    console.log("Deleted tweet:", twuid);
    res.status(200).json(dbs.data);
  } catch (err) {
    console.error("ERROR - api/tweet/draft/delete -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(deleteReviewTweet);
