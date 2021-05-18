// * Hooks
import useScope from "@hooks/use-scope";
import useUser from "@hooks/use-user";

// * Components
import DashboardLayout from "@components/layouts/pages/dashboard";
import SettingsLayout from "@components/layouts/components/settings";
import ChangeTeamName from "@components/settings/team/changeName";
import DeleteTeam from "@components/settings/team/delete";
import Reviews from "@components/settings/reviews";

function TeamSettings() {
  const { scope } = useScope();
  const { user } = useUser();
  const isOwner = scope?.owners.includes(user && user.email);
  return scope && user ? (
    <>
      <ChangeTeamName disabled={!isOwner} loading={!!user} />
      <Reviews disabled={!isOwner} loading={!!user} />
      <DeleteTeam disabled={!isOwner} loading={!!user} />
    </>
  ) : null;
}

TeamSettings.getLayout = (page) => (
  <DashboardLayout name="Settings - Team">
    <SettingsLayout>{page}</SettingsLayout>
  </DashboardLayout>
);

export default TeamSettings;
