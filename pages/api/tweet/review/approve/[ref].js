import { client, q } from "../../../_util/fauna";
import { getDocRef, getDocByRef } from "../../../_util/fauna/queries";
import verify from "../../../_util/token/verify";

const approveReviewTweet = async (req, res) => {
  try {
    const { ref } = req.query;
    const dbs = await client.query(
      q.Update(getDocRef("tweets", ref), {
        data: {
          approvedBy: q.Append(
            req.cookies.user_id,
            q.Select(["data", "approvedBy"], getDocByRef("tweets", ref))
          ),
        },
      })
    );
    console.log("Approved tweet:", ref);
    res.status(200).json({ ...dbs.data, ref, updated: dbs.ts });
  } catch (err) {
    console.error("ERROR - api/tweet/review/approve -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(approveReviewTweet);
