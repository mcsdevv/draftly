import { useContext } from "react";
import UserContext from "../context/UserContext";
import { useContextState } from "../hooks/useContextState";

import Header from "../components/header";

export default function Settings() {
  const { user } = useContext(UserContext);
  const { contexts } = useContextState();
  console.log("SETTINGS", contexts);
  return (
    <>
      <Header />
      <main>
        <h1>Settings Page</h1>
        {contexts && contexts.selected}
      </main>
      <style jsx>{``}</style>
    </>
  );
}
