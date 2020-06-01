import { client, q } from "../../_util/fauna";
import { getDocProperty, getDocByRef } from "../../_util/fauna/queries";
import { getRef } from "../../_util/getRef";
import verify from "../../_util/token/verify";

import { query } from "../../_util/db";
const escape = require("sql-template-strings");

const getUserDetails = async (req, res) => {
  try {
    // TODO Use JOIN
    console.time("SQL-DETAILS");
    const userQuery = await query(
      escape`SELECT * FROM users WHERE uid = ${req.cookies.uid}`
    );
    const teamsQuery = await query(
      escape`SELECT * FROM teams WHERE uid = ${req.cookies.uid}`
    );
    console.timeEnd("SQL-DETAILS");
    // * Get user details along with teams they are part of
    console.time("Get user + teams");
    const dbs = await client.query(
      q.Drop(
        2,
        q.Union(
          q.ToArray(getDocByRef("users", req.cookies.user_id)),
          q.If(
            q.IsNonEmpty(
              getDocProperty(
                ["data", "teams"],
                getDocByRef("users", req.cookies.user_id)
              )
            ),
            q.Map(
              getDocProperty(
                ["data", "teams"],
                getDocByRef("users", req.cookies.user_id)
              ),
              q.Lambda("s", q.Get(q.Ref(q.Collection("teams"), q.Var("s"))))
            ),
            []
          )
        )
      )
    );
    console.timeEnd("Get user + teams");
    // * Extract user and teams from db response
    const userData = dbs[0];
    const teamsData = dbs.slice(1);
    console.log("TEAMS DATA", teamsData);
    userData.shift();
    const user = userData.shift();
    const teams = teamsData.map((t) => {
      delete t.data.auth;
      if (!t.data.owners.includes(req.cookies.user_id)) {
        delete t.data.inviteCode;
      }
      return { ref: getRef(t.ref), ...t.data };
    });
    console.log("User details:", user);
    console.log("Teams details:", teams);
    res.status(200).json({ user, teams });
  } catch (err) {
    console.error("ERROR - api/user/details -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(getUserDetails);
