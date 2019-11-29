import { client, q } from "../../_util/fauna";
const request = require("request-promise");
const verify = require("../../_util/token/verify");

export default (req, res) => {
  verify(req.headers.authorization, async error => {
    if (error) res.status(400).json({ error });
    const { data, email, tokenKey, tokenSecret } = req.body;
    const { name, screen_name, profile_image_url } = data;
    console.log("TEAM BEING CREATED...");
    try {
      await client.query(
        q.Create(q.Collection("teams"), {
          data: {
            name,
            handle: screen_name,
            avatar: profile_image_url,
            plan: "free",
            members: [
              {
                email,
                role: "owner"
              }
            ],
            auth: {
              tokenKey,
              tokenSecret
            }
          }
        })
      );
      // * Update user with the added team also
      const scopeOptions = {
        method: "POST",
        url: `${process.env.AUTH0_REDIRECT_URI}/api/user/create/scope`,
        body: {
          email,
          name: screen_name
        },
        json: true
      };
      const { update } = await request(scopeOptions);
      // ok
      res.status(200).json({ update });
    } catch (e) {
      // something went wrong
      res.status(500).json({ error: e.message });
    }
  });
};
