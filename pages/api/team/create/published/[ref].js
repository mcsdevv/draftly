import { client, q } from "../../../_util/fauna";
import verify from "../../../_util/token/verify-new";

const teamCreatePublished = async (req, res) => {
  try {
    const { handle } = req.body;
    const { ref } = req.query;
    // * Remove tweet from reviews and add to published for a team
    await client.query(
      q.Update(
        q.Select(
          ["ref"],
          q.Get(q.Match(q.Index("all_teams_by_handle"), handle))
        ),
        {
          data: {
            reviews: q.Filter(
              q.Select(
                ["data", "reviews"],
                q.Get(q.Match(q.Index("all_teams_by_handle"), handle))
              ),
              q.Lambda("s", q.Not(q.Equals(ref, q.Var("s"))))
            ),
            published: q.Append(
              ref,
              q.Select(
                ["data", "published"],
                q.Get(q.Match(q.Index("all_teams_by_handle"), handle))
              )
            )
          }
        }
      )
    );
    console.log("Tweet changed from review to published for:", handle);
    res.status(200).json(ref);
  } catch (err) {
    console.error("ERROR - api/team/create/published -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(teamCreatePublished);
