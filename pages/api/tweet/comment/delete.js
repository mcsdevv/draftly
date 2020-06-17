import verify from "../../_util/token/verify";
import { escape, query } from "@lib/api/db";

const deleteComment = async (req, res) => {
  try {
    const { tcuid } = JSON.parse(req.body);

    // * Delete comment
    await query(escape`DELETE FROM tweets_comments WHERE tcuid = ${tcuid}`);

    console.log("Deleted comment:", tcuid);
    res.status(200).json(tcuid);
  } catch (err) {
    console.error("ERROR - api/tweet/draft/delete -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(deleteComment);
