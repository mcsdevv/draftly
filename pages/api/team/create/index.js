import { client, q } from "../../_util/fauna";
const request = require("request-promise");

export default async (req, res) => {
  const { data, email, tokenKey, tokenSecret } = req.body;
  const { name, screen_name, profile_image_url } = data;
  console.log("TEAM BEING CREATED...");
  try {
    const dbs = await client.query(
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
    const scopeOptions = {
      method: "POST",
      url: `${process.env.AUTH0_REDIRECT_URI}/api/user/create/scope`,
      body: {
        email,
        name: screen_name
      },
      json: true
    };
    await request(scopeOptions);
    // TODO: Update user with the added team also
    // ok
    res.status(200).json(dbs.data);
  } catch (e) {
    // something went wrong
    res.status(500).json({ error: e.message });
  }
};
