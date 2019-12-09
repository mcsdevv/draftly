import { client, q } from "../../_util/fauna";
import request from "request-promise";
import verify from "../../_util/token/verify";

export default async (req, res) => {
  verify(req.headers.authorization, async error => {
    if (error) res.status(400).json({ error });
    const { email, handle, name } = req.body;
    const detailsOptions = {
      method: "GET",
      url: `${process.env.AUTH0_REDIRECT_URI}/api/user/details/${email}`,
      headers: {
        Authorization: req.headers.authorization
      },
      json: true
    };
    const user = await request(detailsOptions);
    const oldScopes = user.scopes;
    const newScope = { name, handle, role: "owner", type: "team" };
    // * Checks for existing scope
    if (oldScopes.filter(s => s.name === name).length > 0) {
      res.status(200).json({ update: false });
      return;
    }
    const scopes = [...oldScopes, newScope];
    try {
      await client.query(
        q.Update(
          q.Select(
            ["ref"],
            q.Get(q.Match(q.Index("all_users_by_email"), email))
          ),
          {
            data: {
              scopes
            }
          }
        )
      );
      // ok
      res.status(200).json({ update: true });
    } catch (e) {
      // something went wrong
      res.status(500).json({ error: e.message });
    }
  });
};
