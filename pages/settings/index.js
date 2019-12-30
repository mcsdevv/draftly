import { useRouter } from "next/router";

import Tabs from "../../components/tabs";

import RequireLogin from "../../lib/requireLogin";

function Settings() {
  const router = useRouter();
  router.push("/settings/account");
  return <Tabs />;
}

export default () => RequireLogin(Settings);
