import { useState } from "react";

import { useScope, useTeam, useUser } from "../hooks/";

import Tabs from "../components/tabs";
import Account from "../components/settings/account";
import Reviews from "../components/settings/reviews";
import Team from "../components/settings/team";

export default function Settings() {
  const { user } = useUser();
  const { scope, scopeDetails, setScope } = useScope();
  const { revalidate: revalidateTeam, team } = useTeam();
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
            revalidateTeam={revalidateTeam}
            scope={scope}
            scopeDetails={scopeDetails}
            setScope={setScope}
            team={team}
            user={user}
          />
        );
      case "Reviews":
        return <Reviews />;
      case "Team":
        return <Team />;
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
