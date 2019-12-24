import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useScope, useUser } from "../../hooks";

export default function Tabs() {
  const [tabs, setTabs] = useState();
  const { user } = useUser();
  const { scope } = useScope();
  const router = useRouter();
  const userTabs = ["Account"];
  const teamTabs = ["Account", "Reviews", "Team"];
  const teamOwnerTabs = ["Account", "Reviews", "Team"];
  const getTabs = () => {
    if (scope && user) {
      if (scope.personal) return setTabs(userTabs);
      const isOwner = scope.owners.includes(user.email);
      if (isOwner) return setTabs(teamOwnerTabs);
      return setTabs(teamTabs);
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
