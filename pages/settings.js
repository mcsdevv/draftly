import { useContext } from "react";
import UserContext from "../context/UserContext";

import PersonalSettings from "../components/settings/personal";
import TeamSettings from "../components/settings/team";

export default function Settings() {
  const { scope, user } = useContext(UserContext);
  console.log(scope, user);
  const scopeType = user.scopes.filter(s => s.name === scope)[0].type;
  console.log("typee", scopeType);
  return (
    <>
      <main>
        <h1>Settings Page</h1>
        {scopeType === "personal" ? <PersonalSettings /> : <TeamSettings />}
      </main>
      <style jsx>{``}</style>
    </>
  );
}
