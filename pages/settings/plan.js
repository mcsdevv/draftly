import { useContext, useState } from "react";
import ScopeContext from "../../context/scopeContext";
import { useProfile } from "../../hooks";

import SettingsTabs from "../../components/tabs/settings";

import RequireLogin from "../../lib/requireLogin";

function Plan() {
  const { user } = useProfile();
  const { scope } = useContext(ScopeContext);
  return (
    <>
      <SettingsTabs />
    </>
  );
}

export default () => RequireLogin(Plan);
