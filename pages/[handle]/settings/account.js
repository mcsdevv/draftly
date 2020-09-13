// * Hooks
import useScope from "@hooks/use-scope";
import useUser from "@hooks/use-user";

// * Components
import DashboardLayout from "@components/layouts/pages/dashboard";
import SettingsLayout from "@components/layouts/components/settings";
import ChangeUserName from "@components/settings/user/changeName";
import DeleteUser from "@components/settings/user/delete";

function AccountSettings() {
  const { scope } = useScope();
  const { user } = useUser();

  return scope && user ? (
    <>
      <ChangeUserName loading={!!user} />
      <DeleteUser loading={!!user} />
    </>
  ) : null;
}

AccountSettings.getLayout = (page) => (
  <DashboardLayout name="Settings - Account">
    <SettingsLayout>{page}</SettingsLayout>
  </DashboardLayout>
);

export default AccountSettings;
