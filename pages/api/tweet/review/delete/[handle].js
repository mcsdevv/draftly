import { client, q } from "../../../_util/fauna";
import {
  getDocProperty,
  getDocByIndex,
  getDocByRef,
} from "../../../_util/fauna/queries";
import verify from "../../../_util/token/verify";

const deleteReviewTweet = async (req, res) => {
  try {
    const { handle } = req.query;
    const { ref } = JSON.parse(req.body);
    // * Delete a review tweet
    const dbs = await client.query(
      q.Delete(getDocProperty(["ref"], getDocByRef("tweets", ref)))
    );
    // * Remove tweet ref from team
    await client.query(
      q.Update(
        getDocProperty(["ref"], getDocByIndex("all_teams_by_handle", handle)),
        {
          data: {
            reviews: q.Filter(
              getDocProperty(
                ["data", "reviews"],
                getDocByIndex("all_teams_by_handle", handle)
              ),
              q.Lambda("s", q.Not(q.Equals(ref, q.Var("s"))))
            ),
          },
        }
      )
    );
    console.log("Deleted review tweet for:", handle);
    res.status(200).json(dbs.data);
  } catch (err) {
    console.error("ERROR - api/tweet/review/delete -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(deleteReviewTweet);
