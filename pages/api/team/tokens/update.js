import { client, q } from "../../_util/fauna";

export default async (req, res) => {
  const { name, tokenKey, tokenSecret } = req.body;
  try {
    // const dbs = await client.query(
    //   q.Create(q.Collection("users"), {
    //     data: {
    //       email,
    //       name,
    //       picture,
    //       plan: "free",
    //       contexts: [
    //         {
    //           name,
    //           role: "owner",
    //           type: "account"
    //         }
    //       ]
    //     }
    //   })
    // );
    console.log(name, tokenKey, tokenSecret);
    // // ok
    res.status(200).json({ hello: "world" });
  } catch (e) {
    // something went wrong
    res.status(500).json({ error: e.message });
  }
};
