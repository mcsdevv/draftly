import cookie from "cookie";
import { client, q } from "../../../_util/fauna";
import {
  getDocProperty,
  getDocRef,
  getDocByIndex,
  getDocByRef,
} from "../../../_util/fauna/queries";
// import { getRef } from "../../../_util/getRef";
import cookieOptions from "../../../_util/cookie/options";

const acceptInvite = async (req, res) => {
  const { id_token, user_id } = req.cookies;
  const { code, ref, team } = req.query;
  console.log("REF", ref);
  // * Differing action if user exists and is logged in
  if (id_token && user_id) {
    console.log("EXISTING");
    try {
      // * Check the user is not currently a member of the team
      const getMembers = await client.query(
        q.Union(
          getDocProperty(
            ["data", "owners"],
            getDocByIndex("all_teams_by_handle", team)
          ),
          getDocProperty(
            ["data", "members"],
            getDocByIndex("all_teams_by_handle", team)
          )
        )
      );
      const isMember = getMembers.includes(req.cookies.user_id);
      if (isMember) {
        throw "Member is already present in team.";
      }
      // * Add to team as a member
      await client.query(
        q.Update(
          getDocProperty(["ref"], getDocByIndex("all_teams_by_handle", team)),
          {
            data: {
              members: q.Append(
                user_id,
                getDocProperty(
                  ["data", "members"],
                  getDocByIndex("all_teams_by_handle", team)
                )
              ),
            },
          }
        )
      );
      // * Add team to user
      await client.query(
        q.Update(getDocRef("users", user_id), {
          data: {
            teams: q.Append(
              ref,
              getDocProperty(["data", "teams"], getDocByRef("users", user_id))
            ),
          },
        })
      );
      res.writeHead(302, {
        Location: `${process.env.AUTH0_REDIRECT_URI}/dashboard`,
      });
      res.end();
      // TODO Change the invite code after
    } catch (err) {
      console.error("ERROR - api/team/invite/accept -", err.message);
      res.status(500).json({ err: err.message });
    }
    // * User does not exist or is not logged in
  } else {
    try {
      res.setHeader("Set-Cookie", [
        cookie.serialize(
          "invited_to",
          String(ref),
          cookieOptions(false, false)
        ),
        cookie.serialize(
          "next",
          String("/dashboard"),
          cookieOptions(false, false)
        ),
      ]);
      res.writeHead(302, {
        Location: `${process.env.AUTH0_REDIRECT_URI}/api/auth/login`,
      });
      res.end();
    } catch (err) {}
    console.log("USER LOGGED OUT", code, team);
  }
  console.error("ERROR - api/team/invite/accept -", err.message);
  res.status(500).json({ err: err.message });
};

export default acceptInvite;
