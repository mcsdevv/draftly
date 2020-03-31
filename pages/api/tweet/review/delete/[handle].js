import { client, q } from "../../../_util/fauna";
import request from "request-promise";
import verify from "../../../_util/token/verify-new";

const deleteReviewTweet = async (req, res) => {
  try {
    const { handle } = req.query;
    const { ref } = JSON.parse(req.body);
    // * Delete a review tweet
    const dbs = await client.query(
      q.Delete(q.Select(["ref"], q.Get(q.Ref(q.Collection("tweets"), ref))))
    );
    // * Remove tweet ref from team
    const deleteOptions = {
      method: "PATCH",
      url: `${process.env.AUTH0_REDIRECT_URI}/api/team/delete/review/${handle}`,
      body: {
        ref
      },
      headers: {
        Authorization: req.headers.authorization || req.cookies.access_token
      },
      json: true
    };
    await request(deleteOptions);
    console.log("Deleted review tweet for:", handle);
    res.status(200).json({ ...dbs.data });
  } catch (err) {
    console.log("ERROR - api/tweet/review/delete -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(deleteReviewTweet);
