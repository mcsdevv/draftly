import { useContext, useState } from "react";
import UserContext from "../context/UserContext";

export default function Tweets() {
  const { scope, user } = useContext(UserContext);
  const [tab, setTab] = useState("Schedule");
  const renderTab = tabName => {
    switch (tabName) {
      case "Schedule":
        return "schedule";
      case "Drafts":
        return "drafts";
      case "Reviews":
        return "reviews";
    }
  };
  return (
    <>
      <main>
        <h1>Tweets Page</h1>
        {scope}
        {renderTab(tab)}
      </main>
      <style jsx>{``}</style>
    </>
  );
}
