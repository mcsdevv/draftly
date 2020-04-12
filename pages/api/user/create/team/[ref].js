import { client, q } from "../../../_util/fauna";
import verify from "../../../_util/token/verify";

const createUserTeam = async (req, res) => {
  try {
    const { email } = req.body;
    const { ref } = req.query;
    // * Add team to user
    await client.query(
      q.Update(
        q.Select(["ref"], q.Get(q.Match(q.Index("all_users_by_email"), email))),
        {
          data: {
            teams: q.Append(
              ref,
              q.Select(
                ["data", "teams"],
                q.Get(q.Match(q.Index("all_users_by_email"), email))
              )
            ),
          },
        }
      )
    );
    console.log("Added new team to user: ", ref);
    res.status(200).json({ update: true });
  } catch (err) {
    console.error("ERROR - api/user/create/team -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(createUserTeam);
