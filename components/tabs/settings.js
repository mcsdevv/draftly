import { useEffect, useState } from "react";
import { useScope, useProfile } from "../../hooks";

import Tabs from "./tabs";

export default function SettingsTabs() {
  const [tabs, setTabs] = useState();
  const { user } = useProfile();
  const { scope } = useScope();
  const userTabs = ["Account"];
  const teamTabs = ["Account", "Reviews", "Plan", "Members"];
  const getTabs = () => {
    if (user) {
      return setTabs(scope.personal ? userTabs : teamTabs);
    }
  };
  useEffect(() => {
    if (scope) getTabs();
  }, [scope, user]);
  return <Tabs tabs={tabs} />;
}
