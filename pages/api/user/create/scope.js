import { client, q } from "../../_util/fauna";
const request = require("request-promise");

export default async (req, res) => {
  const { email, name } = req.body;
  console.log("CREATING SCOPE...");
  const detailsOptions = {
    method: "GET",
    url: `${process.env.AUTH0_REDIRECT_URI}/api/user/details/${email}`,
    json: true
  };
  const user = await request(detailsOptions);
  const oldScopes = user.scopes;
  const newScope = { name, role: "owner", type: "team" };
  // * Checks for existing scope
  if (oldScopes.filter(s => s.name === name).length > 0) {
    res.status(200).json(oldScopes);
  }
  const scopes = [...oldScopes, newScope];
  try {
    const dbs = await client.query(
      q.Update(
        q.Select(["ref"], q.Get(q.Match(q.Index("all_users_by_email"), email))),
        {
          data: {
            scopes
          }
        }
      )
    );
    // ok
    res.status(200).json(dbs.data);
  } catch (e) {
    // something went wrong
    res.status(500).json({ error: e.message });
  }
};
