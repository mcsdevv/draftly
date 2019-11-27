import { useContext, useState } from "react";
import UserContext from "../context/UserContext";

import Tabs from "../components/tabs";
import Schedule from "../components/schedule";
import Drafts from "../components/drafts";
import Reviews from "../components/reviews";

export default function Tweets() {
  const { scope, user } = useContext(UserContext);
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
        {scope}
        {renderTab(tab)}
      </main>
      <style jsx>{``}</style>
    </>
  );
}
