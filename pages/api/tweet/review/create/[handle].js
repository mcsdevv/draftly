import { client, q } from "../../../_util/fauna";
import { getRef } from "../../../_util/getRef";
import request from "request-promise";
import verify from "../../../_util/token/verify-new";

const createReviewTweet = async (req, res) => {
  const { ref } = JSON.parse(req.body);
  const { handle } = req.query;
  try {
    // * Update tweet type to review
    const dbs = await client.query(
      q.Update(q.Ref(q.Collection("tweets"), ref), {
        data: {
          type: "review"
        }
      })
    );
    const draftRef = await dbs.ref;
    const refTrimmed = getRef(draftRef);
    // * Update team with the tweet ref
    const teamOptions = {
      method: "POST",
      url: `${process.env.AUTH0_REDIRECT_URI}/api/team/create/review/${refTrimmed}`,
      body: {
        handle
      },
      headers: {
        Authorization: req.headers.authorization || req.cookies.access_token
      },
      json: true
    };
    await request(teamOptions);
    console.log("Created review tweet for:", handle);
    res.status(200).json(dbs.data);
  } catch (err) {
    console.log("ERROR - api/tweet/review/create -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(createReviewTweet);
