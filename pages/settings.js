import { useProfile, useScope } from "../hooks";

import RequireLogin from "../lib/requireLogin";

import { Heading } from "@chakra-ui/core";
import Page from "../components/page";

import Members from "../components/settings/members";
import Plan from "../components/settings/plan";
import Reviews from "../components/settings/reviews";

import ChangeTeamName from "../components/settings/team/changeName";
import DeleteTeam from "../components/settings/team/delete";

import ChangeUserName from "../components/settings/user/changeName";
import DeleteUser from "../components/settings/user/delete";

function Settings() {
  const { user } = useProfile();
  const { scope } = useScope();
  const isOwner = scope.owners.includes(user && user.email);
  return (
    <Page>
      <Heading as="h2" mb="8">
        User
      </Heading>
      <ChangeUserName loading={!!user} />
      <DeleteUser loading={!!user} />
      <Heading as="h2" my="8">
        Team
      </Heading>
      <ChangeTeamName disabled={!isOwner} loading={!!user} />
      <DeleteTeam disabled={!isOwner} loading={!!user} />
      <Reviews disabled={!isOwner} loading={!!user} />
      <Plan disabled={!isOwner} loading={!!user} />
      <Members disabled={!isOwner} loading={!!user} />
    </Page>
  );
}

export default () => RequireLogin(Settings);
