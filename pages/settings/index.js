import { useRouter } from "next/router";

import SettingsTabs from "../../components/tabs/settings";

import RequireLogin from "../../lib/requireLogin";

function Settings() {
  const router = useRouter();
  router.push("/settings/account");
  return <SettingsTabs />;
}

export default () => RequireLogin(Settings);
