import { client, q } from "../../../_util/fauna";
import { getDocByIndex, getDocByRef } from "../../../_util/fauna/queries";
import verify from "../../../_util/token/verify";

const deleteDraftTweet = async (req, res) => {
  try {
    const { handle } = req.query;
    const { ref } = JSON.parse(req.body);
    // * Delete a draft tweet
    const dbs = await client.query(
      q.Delete(q.Select(["ref"], getDocByRef("tweets", ref)))
    );
    // * Remove tweet ref from team
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
          },
        }
      )
    );
    console.log("Deleted tweet for:", handle);
    res.status(200).json(dbs.data);
  } catch (err) {
    console.error("ERROR - api/tweet/draft/delete -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(deleteDraftTweet);
