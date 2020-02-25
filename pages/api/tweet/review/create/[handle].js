import { client, q } from "../../../_util/fauna";
import { getRef } from "../../../_util/getRef";
import request from "request-promise";
import verify from "../../../_util/token/verify";

export default (req, res) => {
  verify(req.headers.authorization || req.cookies.access_token, async error => {
    if (error) res.status(400).json({ error });
    const { creator, ref } = JSON.parse(req.body);
    console.log("CREATOR", creator);
    const { handle } = req.query;
    try {
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
      // ok
      res.status(200).json(dbs.data);
    } catch (e) {
      // something went wrong
      res.status(500).json({ error: e.message });
    }
  });
};
