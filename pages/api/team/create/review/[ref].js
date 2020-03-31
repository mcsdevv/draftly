import { client, q } from "../../../_util/fauna";
import verify from "../../../_util/token/verify-new";

const teamCreateReview = async (req, res) => {
  const { handle } = req.body;
  const { ref } = req.query;
  try {
    // * Remove tweet from drafts and add to reviews for a team
    await client.query(
      q.Update(
        q.Select(
          ["ref"],
          q.Get(q.Match(q.Index("all_teams_by_handle"), handle))
        ),
        {
          data: {
            drafts: q.Filter(
              q.Select(
                ["data", "drafts"],
                q.Get(q.Match(q.Index("all_teams_by_handle"), handle))
              ),
              q.Lambda("s", q.Not(q.Equals(ref, q.Var("s"))))
            ),
            reviews: q.Append(
              ref,
              q.Select(
                ["data", "reviews"],
                q.Get(q.Match(q.Index("all_teams_by_handle"), handle))
              )
            )
          }
        }
      )
    );
    console.log("Tweet changed from draft to review for:", handle);
    res.status(200).json(ref);
  } catch (err) {
    console.error("ERROR - api/team/create/review -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(teamCreateReview);
