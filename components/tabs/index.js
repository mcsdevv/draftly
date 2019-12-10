import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useScope } from "../../hooks";

export default function Tabs() {
  const [tabs, setTabs] = useState();
  const { scopeDetails } = useScope();
  const router = useRouter();
  const userTabs = ["Account"];
  const teamTabs = ["Account", "Reviews", "Team"];
  const teamOwnerTabs = ["Account", "Reviews", "Team"];
  const getTabs = () => {
    console.log(scopeDetails);
    if (scopeDetails.personal) return setTabs(userTabs);
    if (scopeDetails.role === "owner") return setTabs(teamOwnerTabs);
    return setTabs(teamTabs);
  };
  useEffect(() => {
    if (scopeDetails) getTabs();
  }, [scopeDetails]);
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
