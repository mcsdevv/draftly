import { client, q } from "../../../_util/fauna";
import { getRef } from "../../../_util/getRef";
import request from "request-promise";
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
    const { ref } = await dbs;
    const refTrimmed = getRef(ref);
    // * Update team with the tweet ref
    const teamOptions = {
      method: "POST",
      url: `${process.env.AUTH0_REDIRECT_URI}/api/team/create/draft/${handle}`,
      body: {
        refTrimmed,
      },
      headers: {
        Authorization: req.headers.authorization || req.cookies.access_token,
      },
      json: true,
    };
    await request(teamOptions);
    console.log("Draft tweet created for:", handle);
    res.status(200).json({ ref: refTrimmed });
  } catch (err) {
    console.error("ERROR - api/tweet/draft/create -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(isMember(createDraftTweet));
