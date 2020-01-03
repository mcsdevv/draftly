import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useScope, useProfile } from "../../hooks";

export default function SettingsTabs() {
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
    <ul className="flex border-b">
      {tabs &&
        tabs.map(t => (
          <li
            key={t}
            onClick={() => selectTab(t)}
            className={`mr-1 py-2 px-4 text-blue-500 ${
              router.pathname.includes(t.toLowerCase())
                ? "border-l border-t border-r rounded-t -mb-px text-blue-700"
                : undefined
            }`}
          >
            {t}
          </li>
        ))}
    </ul>
  );
}
