import { client, q } from "../../../_util/fauna";
import verify from "../../../_util/token/verify";

const approveReviewTweet = async (req, res) => {
  try {
    const { email } = JSON.parse(req.body);
    const { ref } = req.query;
    const dbs = await client.query(
      q.Update(q.Ref(q.Collection("tweets"), ref), {
        data: {
          approvedBy: q.Append(
            email,
            q.Select(
              ["data", "approvedBy"],
              q.Get(q.Ref(q.Collection("tweets"), ref))
            )
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
