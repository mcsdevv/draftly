import { useContext, useEffect, useState } from "react";
import ScopeContext from "../context/scopeContext";
import { useUser } from "../hooks/useUser";
import { useTeam } from "../hooks/useTeam";

import Tabs from "../components/tabs";
import Account from "../components/settings/account";
import Reviews from "../components/settings/reviews";
import Team from "../components/settings/team";

export default function Settings() {
  const { scope } = useContext(ScopeContext);
  const user = useUser();
  const team = useTeam(scope);
  const [tab, setTab] = useState("Account");
  const [scopeDetails, setScopeDetails] = useState(undefined);
  // TODO Make this a hook that uses scope context
  useEffect(() => {
    function getScopeDetails() {
      if (user) {
        const details = user.scopes.filter(s => s.name === scope)[0];
        setScopeDetails({
          personal: details.type === "personal",
          role: details.role
        });
      }
    }
    getScopeDetails();
  }, [scope]);
  const userTabs = ["Account"];
  const teamTabs = ["Account", "Reviews", "Team"];
  const teamOwnerTabs = ["Account", "Reviews", "Team"];
  const getTabs = () => {
    if (scopeDetails.personal) return userTabs;
    if (scopeDetails.role) return teamOwnerTabs;
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
