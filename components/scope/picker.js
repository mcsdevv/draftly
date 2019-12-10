import { useEffect, useState } from "react";
import { useScope, useTeam, useUser } from "../../hooks/";

export default function ScopePicker() {
  const [savedTeam, setSavedTeam] = useState(undefined);
  const { scope, setScope, updateScope } = useScope();
  const { team } = useTeam();
  const { user } = useUser();
  useEffect(() => {
    if (!scope && user) {
      const { name, role, type } = user.scopes[0];
      setScope({ name, role, type });
    }
  }, [user]);
  useEffect(() => {
    if (team !== undefined) {
      setSavedTeam(team);
    }
  }, [team]);
  return scope && user && user.scopes ? (
    <select value={scope.name || user.scopes[0].name} onChange={updateScope}>
      {user.scopes.map(c => (
        <option key={c.name} value={c.handle || c.name}>
          {savedTeam && c.type === "team" ? savedTeam.name : c.name}
        </option>
      ))}
      <option value="new">+ Add New Team</option>
    </select>
  ) : null;
}
