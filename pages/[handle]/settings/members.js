// * Hooks
import useScope from "@hooks/use-scope";
import useUser from "@hooks/use-user";

// * Components
import DashboardLayout from "@components/layouts/pages/dashboard";
import SettingsLayout from "@components/layouts/components/settings";
import Members from "@components/settings/members";

function MembersSettings() {
  const { scope } = useScope();
  const { user } = useUser();
  const isOwner = scope?.owners.includes(user && user.email);
  return scope && user ? (
    <Members disabled={!isOwner} loading={!!user} />
  ) : null;
}

MembersSettings.getLayout = (page) => (
  <DashboardLayout name="Settings - Account">
    <SettingsLayout>{page}</SettingsLayout>
  </DashboardLayout>
);

export default MembersSettings;
