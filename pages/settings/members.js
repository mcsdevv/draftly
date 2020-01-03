import { useContext, useState } from "react";
import ScopeContext from "../../context/scopeContext";
import { useProfile } from "../../hooks";

import SettingsTabs from "../../components/tabs/settings";

import RequireLogin from "../../lib/requireLogin";

function Members() {
  const { user } = useProfile();
  const { scope } = useContext(ScopeContext);
  return (
    <>
      <SettingsTabs />
      <h1>Members</h1>
      <style jsx>{``}</style>
    </>
  );
}

export default () => RequireLogin(Members);
