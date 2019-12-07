import { useState } from "react";

import { useScope } from "../hooks/useScope";
import { useTeam } from "../hooks/useTeam";
import { useUser } from "../hooks/useUser";

import Tabs from "../components/tabs";
import Account from "../components/settings/account";
import Reviews from "../components/settings/reviews";
import Team from "../components/settings/team";

export default function Settings() {
  const user = useUser();
  const [scope, scopeDetails] = useScope();
  // const team = useTeam(scope);
  const team = useTeam();
  const [tab, setTab] = useState("Account");
  const userTabs = ["Account"];
  const teamTabs = ["Account", "Reviews", "Team"];
  const teamOwnerTabs = ["Account", "Reviews", "Team"];
  const getTabs = () => {
    if (scopeDetails.personal) return userTabs;
    if (scopeDetails.role === "owner") return teamOwnerTabs;
    return teamTabs;
  };
  const renderTab = tabName => {
    switch (tabName) {
      case "Account":
        return (
          <Account
            isOwner={scopeDetails && scopeDetails.role}
            isPersonal={scopeDetails && scopeDetails.personal}
            scope={scope}
            team={team}
            user={user}
          />
        );
      case "Reviews":
        return <Reviews user={user} />;
      case "Team":
        return <Team user={user} />;
    }
  };
  return (
    <>
      {scopeDetails && <Tabs tabNames={getTabs()} setTab={setTab} />}
      {renderTab(tab)}
      <style jsx>{``}</style>
    </>
  );
}
