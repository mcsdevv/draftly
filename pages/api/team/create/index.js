import { client, q } from "../../_util/fauna";
import { getRef } from "../../_util/getRef";
import verify from "../../_util/token/verify";

const teamCreate = async (req, res) => {
  try {
    const { data, email, tokenKey, tokenSecret } = req.body;
    console.log("data", data);
    const { name, screen_name, profile_image_url_https } = data;
    // * Create a team
    const dbs = await client.query(
      q.Create(q.Collection("teams"), {
        data: {
          name,
          handle: screen_name,
          avatar: profile_image_url_https,
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
            tokenSecret,
          },
        },
      })
    );
    const { ref } = await dbs;
    const refTrimmed = getRef(ref);
    // * Update user with the team ref
    await client.query(
      q.Update(
        q.Select(["ref"], q.Get(q.Match(q.Index("all_users_by_email"), email))),
        {
          data: {
            teams: q.Append(
              refTrimmed,
              q.Select(
                ["data", "teams"],
                q.Get(q.Match(q.Index("all_users_by_email"), email))
              )
            ),
          },
        }
      )
    );
    console.log("Created team:", name);
    res.status(200).json({ update: true });
  } catch (err) {
    console.error("ERROR - api/team/create -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(teamCreate);
