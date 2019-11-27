import { client, q } from "../../_util/fauna";

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
    // ok
    res.status(200).json(dbs.data);
  } catch (e) {
    // something went wrong
    res.status(500).json({ error: e.message });
  }
};
