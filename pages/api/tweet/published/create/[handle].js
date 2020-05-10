const Twitter = require("twitter");
import { client, q } from "../../../_util/fauna";
import {
  getDocProperty,
  getDocByIndex,
  getDocRef,
} from "../../../_util/fauna/queries";
import { getRef } from "../../../_util/getRef";
import verify from "../../../_util/token/verify";

const createPublishedTweet = async (req, res) => {
  try {
    const { ref, tweet } = JSON.parse(req.body);
    const { handle } = req.query;
    // * Get keys to post tweet
    const keys = await client.query(
      getDocByIndex("all_teams_by_handle", handle)
    );
    const { tokenKey, tokenSecret } = keys.data.auth;
    // * Create new Twitter client with account and application keys
    const twitterClient = new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: tokenKey,
      access_token_secret: tokenSecret,
    });
    // * Post tweet
    twitterClient.post("statuses/update", { status: tweet }, function (
      error,
      tweet,
      response
    ) {
      if (error) throw error;
      console.error("Error posting tweet: ", tweet);
    });
    // * Update the tweet type to published
    const dbs = await client.query(
      q.Update(getDocRef("tweets", ref), {
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
        getDocProperty(["ref"], getDocByIndex("all_teams_by_handle", handle)),
        {
          data: {
            reviews: q.Filter(
              getDocProperty(
                ["data", "reviews"],
                getDocByIndex("all_teams_by_handle", handle)
              ),
              q.Lambda("s", q.Not(q.Equals(refTrimmed, q.Var("s"))))
            ),
            published: q.Append(
              refTrimmed,
              getDocProperty(
                ["data", "published"],
                getDocByIndex("all_teams_by_handle", handle)
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
