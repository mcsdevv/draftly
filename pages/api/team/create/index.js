import { client, q } from "../../_util/fauna";
import { getRef } from "../../_util/getRef";
import request from "request-promise";
import verify from "../../_util/token/verify";

export default (req, res) => {
  verify(req.headers.authorization, async error => {
    if (error) res.status(400).json({ error });
    const { data, email, tokenKey, tokenSecret } = req.body;
    const { name, screen_name, profile_image_url } = data;
    try {
      // * Create a team
      const dbs = await client.query(
        q.Create(q.Collection("teams"), {
          data: {
            name,
            handle: screen_name,
            avatar: profile_image_url,
            protected: data.protected,
            plan: "free",
            members: [],
            owners: [email],
            reviewsRequired: 0,
            drafts: [],
            reviews: [],
            published: [],
            auth: {
              tokenKey,
              tokenSecret
            }
          }
        })
      );
      const { ref } = await dbs;
      const refTrimmed = getRef(ref);
      // * Update user with the team ref
      const teamOptions = {
        method: "POST",
        url: `${process.env.AUTH0_REDIRECT_URI}/api/user/create/team/${refTrimmed}`,
        body: {
          email
        },
        headers: {
          Authorization: req.headers.authorization
        },
        json: true
      };
      const { update } = await request(teamOptions);
      console.log("Created team: ", name);
      res.status(200).json({ update });
    } catch (e) {
      console.log("ERROR - api/team/create -", e.message);
      res.status(500).json({ error: e.message });
    }
  });
};
