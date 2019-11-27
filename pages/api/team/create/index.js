import { client, q } from "../../_util/fauna";
import { decrypt } from "../../_util/token/encryption";

export default async (req, res) => {
  const { data, email, tokenKey, tokenSecret } = req.body;
  const { name, screen_name, profile_image_url } = data;
  console.log(
    data,
    email,
    tokenKey,
    tokenSecret,
    name,
    screen_name,
    profile_image_url
  );
  console.log("TEAM BEING CREATED...");
  try {
    // const dbs = await client.query(
    //   q.Create(q.Collection("teams"), {
    //     data: {
    //       name,
    //       handle: screen_name,
    //       avatar: profile_image_url,
    //       plan: "free",
    //       members: [
    //         {
    //           email: "complete-me",
    //           role: "owner"
    //         }
    //       ],
    //       auth: {
    //         tokenKey,
    //         tokenSecret
    //       }
    //     }
    //   })
    // );
    console.log("EMAIL....", email);
    // ok
    res.status(200).json({ hello: "world" });
  } catch (e) {
    // something went wrong
    res.status(500).json({ error: e.message });
  }
};
