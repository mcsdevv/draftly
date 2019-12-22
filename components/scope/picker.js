import { useEffect, useState } from "react";
import { useScope, useTeam, useUser } from "../../hooks/";

export default function ScopePicker() {
  const [savedTeam, setSavedTeam] = useState(undefined);
  const { scope, setScope, updateScope } = useScope();
  const { team } = useTeam();
  const { user } = useUser();
  console.log("user", user);
  useEffect(() => {
    if (!scope && user) {
      console.log("user", user);
      const { name } = user;
      setScope({ name, type: "personal" });
    }
  }, [user]);
  useEffect(() => {
    if (team !== undefined) {
      setSavedTeam(team);
    }
  }, [team]);
  return scope && user && user.teams ? (
    <select value={scope.name || user.name} onChange={updateScope}>
      {user.teams.map(c => (
        <option key={c.name} value={c.handle || c.name}>
          {savedTeam && c.type === "team" ? savedTeam.name : c.name}
        </option>
      ))}
      <option value="new">+ Add New Team</option>
    </select>
  ) : null;
}
