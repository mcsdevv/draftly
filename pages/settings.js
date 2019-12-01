import { useContext, useState } from "react";
import UserContext from "../context/UserContext";

import Tabs from "../components/tabs";
import Account from "../components/settings/account";
import Reviews from "../components/settings/reviews";
import Team from "../components/settings/team";

export default function Settings() {
  const { scope, user } = useContext(UserContext);
  const scopeType = user && user.scopes.filter(s => s.name === scope)[0].type;
  const isOwner =
    user && user.scopes.filter(s => s.name === scope)[0] === "owner";
  const [tab, setTab] = useState("Schedule");
  const renderTab = tabName => {
    switch (tabName) {
      case "Account":
        return <Account />;
      case "Reviews":
        return <Reviews />;
      case "Team":
        return <Team />;
    }
  };
  return (
    <>
      <Tabs tabNames={["Account", "Reviews", "Team"]} setTab={setTab} />
      <main>
        <h1>Settings Page</h1>
        {renderTab(tab)}
      </main>
      <style jsx>{``}</style>
    </>
  );
}
