import { client, q } from "../../../_util/fauna";
import { getRef } from "../../../_util/getRef";
import request from "request-promise";
import verify from "../../../_util/token/verify";

export default (req, res) => {
  verify(req.headers.authorization || req.cookies.access_token, async error => {
    if (error) res.status(400).json({ error });
    const { creator, metadata, tweet } = JSON.parse(req.body);
    const { handle } = req.query;
    try {
      // * Create a draft tweet
      const dbs = await client.query(
        q.Create(q.Collection("tweets"), {
          data: {
            approvedBy: [],
            comments: [],
            creator,
            metadata,
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
      console.log("Draft tweet created for:", handle);
      res.status(200).json({ ref: refTrimmed });
    } catch (e) {
      console.log("ERROR - api/tweet/draft/create -", e.message);
      res.status(500).json({ error: e.message });
    }
  });
};
