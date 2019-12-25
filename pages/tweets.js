import { useContext, useState } from "react";
import ScopeContext from "../context/scopeContext";
import { useProfile } from "../hooks";

import Tabs from "../components/tabs";
import Schedule from "../components/schedule";
import Drafts from "../components/drafts";
import Reviews from "../components/reviews";

export default function Tweets() {
  const { user } = useProfile();
  const { scope } = useContext(ScopeContext);
  const [tab, setTab] = useState("Schedule");
  const renderTab = tabName => {
    switch (tabName) {
      case "Schedule":
        return <Schedule />;
      case "Drafts":
        return <Drafts />;
      case "Reviews":
        return <Reviews />;
    }
  };
  return (
    <>
      <Tabs tabNames={["Schedule", "Drafts", "Reviews"]} setTab={setTab} />
      <main>
        <h1>Tweets Page</h1>
        {scope.name}
        {renderTab(tab)}
      </main>
      <style jsx>{``}</style>
    </>
  );
}
