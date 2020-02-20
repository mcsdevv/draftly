import { useProfile } from "../hooks";

import RequireLogin from "../lib/requireLogin";

import Account from "../components/settings/account";
import Reviews from "../components/settings/reviews";
import Plan from "../components/settings/plan";
import Members from "../components/settings/members";

function Settings() {
  const { user } = useProfile();
  return (
    <>
      <Account />
      <Reviews />
      <Plan />
      <Members />
    </>
  );
}

export default () => RequireLogin(Settings);
