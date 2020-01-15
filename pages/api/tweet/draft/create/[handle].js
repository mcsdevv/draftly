import { client, q } from "../../../_util/fauna";
import { getRef } from "../../../_util/getRef";
import request from "request-promise";
import verify from "../../../_util/token/verify";
import getUrls from "get-urls";

export default (req, res) => {
  verify(req.headers.authorization || req.cookies.access_token, async error => {
    if (error) res.status(400).json({ error });
    const { creator, tweet } = JSON.parse(req.body);
    const { handle } = req.query;
    // * Get URL's from tweet
    // * Twitter user last URL in a Tweet to decide the image
    const urlList = getUrls(tweet, { requireSchemeOrWww: false });
    console.log("URLS", urlList);
    try {
      const dbs = await client.query(
        q.Create(q.Collection("tweets"), {
          data: {
            creator,
            text: tweet,
            type: "draft"
          }
        })
      );
      const { ref } = await dbs;
      const refTrimmed = getRef(ref);
      // * Update team with the tweet ref
      const teamOptions = {
        method: "POST",
        url: `${process.env.AUTH0_REDIRECT_URI}/api/team/create/draft/${refTrimmed}`,
        body: {
          handle
        },
        headers: {
          Authorization: req.headers.authorization || req.cookies.access_token
        },
        json: true
      };
      await request(teamOptions);
      // ok
      res.status(200).json({ ref: refTrimmed });
    } catch (e) {
      // something went wrong
      res.status(500).json({ error: e.message });
    }
  });
};
