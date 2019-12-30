import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useScope, useProfile } from "../../hooks";

export default function Tabs() {
  const [tabs, setTabs] = useState();
  const { user } = useProfile();
  const { scope } = useScope();
  const router = useRouter();
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
  const selectTab = tab => {
    router.push(`/settings/${tab.toLowerCase()}`);
  };
  return (
    <div>
      {tabs &&
        tabs.map(t => (
          <button key={t} onClick={() => selectTab(t)}>
            {t}
          </button>
        ))}
    </div>
  );
}
