import { useProfile } from "../hooks";

import RequireLogin from "../lib/requireLogin";

import Reviews from "../components/settings/reviews";
import Plan from "../components/settings/plan";
import Members from "../components/settings/members";

import ChangeTeamName from "../components/settings/team/changeName";
import DeleteTeam from "../components/settings/team/delete";

import ChangeUserName from "../components/settings/user/changeName";
import DeleteUser from "../components/settings/user/delete";

function Settings() {
  const { user } = useProfile();
  return (
    <>
      <h1>Team</h1>
      <ChangeTeamName />
      <DeleteTeam />
      <h1>User</h1>
      <ChangeUserName />
      <DeleteUser />
      <Reviews />
      <Plan />
      <Members />
    </>
  );
}

export default () => RequireLogin(Settings);
