import { useEffect } from "react";
import { useScope, useUser } from "../../hooks/";

export default function ScopePicker() {
  const { scope, setScope, updateScope } = useScope();
  const { teams, user } = useUser();
  useEffect(() => {
    if (!scope && user) {
      setScope({ ...user, personal: true });
    }
  }, [user]);
  return user ? (
    <select
      value={scope ? scope.handle || scope.name : user.name}
      onChange={updateScope}
    >
      <option value={user.name}>{user.name}</option>
      {teams &&
        teams.map(t => (
          <option key={t.name} value={t.handle}>
            {t.name}
          </option>
        ))}
      <option value="new">+ Add New Team</option>
    </select>
  ) : null;
}
