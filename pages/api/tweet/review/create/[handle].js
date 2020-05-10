import { client, q } from "../../../_util/fauna";
import { getDocByIndex, getDocRef } from "../../../_util/fauna/queries";
import { getRef } from "../../../_util/getRef";
import verify from "../../../_util/token/verify";

const createReviewTweet = async (req, res) => {
  const { ref } = JSON.parse(req.body);
  const { handle } = req.query;
  try {
    // * Update tweet type to review
    const dbs = await client.query(
      q.Update(getDocRef("tweets", ref), {
        data: {
          type: "review",
        },
      })
    );
    const draftRef = await dbs.ref;
    const refTrimmed = getRef(draftRef);
    // * Update team with the tweet ref
    await client.query(
      q.Update(
        q.Select(["ref"], getDocByIndex("all_teams_by_handle", handle)),
        {
          data: {
            drafts: q.Filter(
              q.Select(
                ["data", "drafts"],
                getDocByIndex("all_teams_by_handle", handle)
              ),
              q.Lambda("s", q.Not(q.Equals(ref, q.Var("s"))))
            ),
            reviews: q.Append(
              refTrimmed,
              q.Select(
                ["data", "reviews"],
                getDocByIndex("all_teams_by_handle", handle)
              )
            ),
          },
        }
      )
    );
    console.log("Created review tweet for:", handle);
    res.status(200).json(dbs.data);
  } catch (err) {
    console.error("ERROR - api/tweet/review/create -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(createReviewTweet);
