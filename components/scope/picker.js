import { useEffect, useContext } from "react";
import ScopeContext from "../../context/scopeContext";
import { useUser } from "../../hooks/useUser";

export default function ScopePicker() {
  const { scope, setScope, updateScope } = useContext(ScopeContext);
  const user = useUser();
  useEffect(() => {
    console.log(user);
    if (!scope && user) {
      const { name, role, type } = user.scopes[0];
      setScope({ name, role, type });
    }
  }, [user]);
  return user && user.scopes ? (
    <select value={scope || user.scopes[0].name} onChange={updateScope}>
      {user.scopes.map(c => (
        <option key={c.name} value={c.handle || c.name}>
          {c.name}
        </option>
      ))}
      <option value="new">+ Add New Team</option>
    </select>
  ) : null;
}
