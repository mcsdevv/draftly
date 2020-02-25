import { useProfile, useScope } from "../hooks";

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
  const { scope } = useScope();
  const isOwner = scope.owners.includes(user && user.email);
  return (
    <>
      <h1>Team</h1>
      <ChangeTeamName disabled={!isOwner} loading={!!user} />
      <DeleteTeam disabled={!isOwner} loading={!!user} />
      <h1>User</h1>
      <ChangeUserName loading={!!user} />
      <DeleteUser loading={!!user} />
      <Reviews disabled={!isOwner} loading={!!user} />
      <Plan disabled={!isOwner} loading={!!user} />
      <Members disabled={!isOwner} loading={!!user} />
    </>
  );
}

export default () => RequireLogin(Settings);
