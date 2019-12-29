import { client, q } from "../../_util/fauna";
import request from "request-promise";
import verify from "../../_util/token/verify";

export default (req, res) => {
  verify(req.headers.authorization, async error => {
    if (error) res.status(400).json({ error });
    const { data, email, tokenKey, tokenSecret } = req.body;
    const { name, screen_name, profile_image_url } = data;
    try {
      const dbs = await client.query(
        q.Create(q.Collection("teams"), {
          data: {
            name,
            handle: screen_name,
            avatar: profile_image_url,
            plan: "free",
            members: [],
            owners: [email],
            auth: {
              tokenKey,
              tokenSecret
            }
          }
        })
      );
      const { ref } = await dbs;
      const refString = ref.toString();
      const refNums = refString.match(/\d/g);
      const refJoined = refNums.join("");
      // * Update user with the added team also
      const teamOptions = {
        method: "POST",
        url: `${process.env.AUTH0_REDIRECT_URI}/api/user/create/team/${refJoined}`,
        body: {
          email
        },
        headers: {
          Authorization: req.headers.authorization
        },
        json: true
      };
      const { update } = await request(teamOptions);
      // ok
      res.status(200).json({ update });
    } catch (e) {
      // something went wrong
      res.status(500).json({ error: e.message });
    }
  });
};
