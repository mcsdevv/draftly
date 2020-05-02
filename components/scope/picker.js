import { useContext, useEffect } from "react";
import { useProfile } from "../../hooks/";
import ScopeContext from "../../context/scopeContext";

import Link from "../link";
import Select from "../select";

export default function ScopePicker() {
  const { scope, setScope } = useContext(ScopeContext);
  const { teams } = useProfile();
  const handleOnChange = (e) => {
    const name = e.target.value;
    if (name === "new") {
      router.push("/api/auth/twitter/connect");
      return;
    }
    const scopeDetails = teams.find((t) => t.handle === name);
    setStoredScope({ ...scopeDetails });
  };
  const setStoredScope = (newScope) => {
    localStorage.setItem("scope", JSON.stringify(newScope));
    setScope(newScope);
  };
  useEffect(() => {
    function getStoredScope() {
      const scopeStored = localStorage.getItem("scope");
      if (scopeStored !== undefined && scopeStored != null) {
        const newScope = JSON.parse(scopeStored);
        setStoredScope(newScope);
      }
      if (teams) {
        setStoredScope(teams[0]);
      }
    }
    getStoredScope();
  }, [scope, teams]);
  return teams?.length > 0 ? (
    scope ? (
      <Select
        onChange={handleOnChange}
        options={teams}
        value={(scope && scope.handle) || scope.name}
      />
    ) : (
      <Link href="/api/auth/twitter/connect">+ Add New Team</Link>
    )
  ) : null;
}
