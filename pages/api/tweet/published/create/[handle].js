import { client, q } from "../../../_util/fauna";
import { getRef } from "../../../_util/getRef";
import request from "request-promise";
import verify from "../../../_util/token/verify";

const createPublishedTweet = async (req, res) => {
  try {
    const { ref, tweet } = JSON.parse(req.body);
    const { handle } = req.query;
    // * Attempt to post tweet
    // TODO Handle error
    const tweetOptions = {
      method: "POST",
      url: `${process.env.AUTH0_REDIRECT_URI}/api/auth/twitter/post/${handle}`,
      body: {
        tweet,
      },
      headers: {
        Authorization: req.headers.authorization || req.cookies.access_token,
      },
      json: true,
    };
    await request(tweetOptions);
    // * Update the tweet type to published
    const dbs = await client.query(
      q.Update(q.Ref(q.Collection("tweets"), ref), {
        data: {
          type: "published",
        },
      })
    );
    const draftRef = await dbs.ref;
    const refTrimmed = getRef(draftRef);
    // * Update team with the tweet ref
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
              q.Lambda("s", q.Not(q.Equals(refTrimmed, q.Var("s"))))
            ),
            published: q.Append(
              refTrimmed,
              q.Select(
                ["data", "published"],
                q.Get(q.Match(q.Index("all_teams_by_handle"), handle))
              )
            ),
          },
        }
      )
    );
    console.log("Published tweet created for:", handle);
    res.status(200).json(dbs.data);
  } catch (err) {
    console.error("ERROR - api/tweet/published/create -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(createPublishedTweet);
