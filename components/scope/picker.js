import { useEffect } from "react";
import { useScope } from "../../hooks/useScope";
import { useUser } from "../../hooks/useUser";

export default function ScopePicker() {
  const { scope, updateScope } = useScope();
  const user = useUser();
  useEffect(() => {
    if (!scope && user) {
      const { name, role, type } = user.scopes[0];
      setScope({ name, role, type });
    }
  }, [user]);
  return user && user.scopes ? (
    <select value={scope.name || user.scopes[0].name} onChange={updateScope}>
      {user.scopes.map(c => (
        <option key={c.name} value={c.handle || c.name}>
          {c.name}
        </option>
      ))}
      <option value="new">+ Add New Team</option>
    </select>
  ) : null;
}
