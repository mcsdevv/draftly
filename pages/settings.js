import { useContext, useState } from "react";
import UserContext from "../context/UserContext";

import Tabs from "../components/tabs";
import Account from "../components/settings/account";
import Reviews from "../components/settings/reviews";
import Team from "../components/settings/team";

export default function Settings() {
  const { scope, teams, updateTeams, user } = useContext(UserContext);
  const [tab, setTab] = useState("Account");
  const scopeDetails = user && user.scopes.filter(s => s.name === scope)[0];
  const scopeType = user && scopeDetails.type;
  const isOwner = user && scopeDetails.role === "owner";
  const userTabs = ["Account"];
  const teamTabs = ["Account", "Reviews", "Team"];
  const teamOwnerTabs = ["Account", "Reviews", "Team"];
  const getTabs = () => {
    if (scopeType === "user") return userTabs;
    if (isOwner) return teamOwnerTabs;
    return teamTabs;
  };
  const renderTab = tabName => {
    switch (tabName) {
      case "Account":
        return (
          <Account
            scope={scope}
            scopeType={scopeType}
            teams={teams}
            updateTeams={updateTeams}
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
      <Tabs tabNames={getTabs()} setTab={setTab} />
      {renderTab(tab)}
      <style jsx>{``}</style>
    </>
  );
}
