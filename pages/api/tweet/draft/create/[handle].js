import { client, q } from "../../../_util/fauna";
import { getDocByIndex } from "../../../_util/fauna/queries";
import { getRef } from "../../../_util/getRef";
import verify from "../../../_util/token/verify";
import isMember from "../../../_util/middleware/isMember";

const createDraftTweet = async (req, res) => {
  try {
    const { creator, metadata, tweet } = JSON.parse(req.body);
    const { handle } = req.query;
    // * Create a draft tweet
    const dbs = await client.query(
      q.Create(q.Collection("tweets"), {
        data: {
          approvedBy: [],
          comments: [],
          creator,
          metadata,
          text: tweet,
          type: "draft",
        },
      })
    );
    const { data, ref } = await dbs;
    const refTrimmed = getRef(ref);
    // * Update team with the tweet ref
    await client.query(
      q.Update(
        q.Select(["ref"], getDocByIndex("all_teams_by_handle", handle)),
        {
          data: {
            drafts: q.Append(
              refTrimmed,
              q.Select(
                ["data", "drafts"],
                getDocByIndex("all_teams_by_handle", handle)
              )
            ),
          },
        }
      )
    );
    console.log("Draft tweet created for:", handle);
    res.status(200).json({ ...data });
  } catch (err) {
    console.error("ERROR - api/tweet/draft/create -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(isMember(createDraftTweet));
