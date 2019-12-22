import { useEffect, useState } from "react";
import { useScope, useUser } from "../../hooks/";

export default function ScopePicker() {
  const [savedTeam, setSavedTeam] = useState(undefined);
  const { scope, setScope, updateScope } = useScope();
  const { user, teams } = useUser();
  console.log("user", user);
  useEffect(() => {
    if (!scope && user) {
      console.log("user", user);
      const { name } = user;
      setScope({ name, type: "personal" });
    }
  }, [user]);
  console.log(user);
  // console.log(user.name);
  return scope && user ? (
    <select value={scope.name || user.name} onChange={updateScope}>
      <option value={user.name}>{user.name}</option>
      {user.teams &&
        user.teams.map(c => (
          <option key={c.name} value={c.handle || c.name}>
            {savedTeam && c.type === "team" ? savedTeam.name : c.name}
          </option>
        ))}
      <option value="new">+ Add New Team</option>
    </select>
  ) : null;
}
