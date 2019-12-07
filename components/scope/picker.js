import { useEffect, useContext } from "react";
import ScopeContext from "../../context/scopeContext";
import { useUser } from "../../hooks/useUser";

export default function ScopePicker() {
  const { scope, setScope } = useContext(ScopeContext);
  const user = useUser();
  useEffect(() => {
    console.log(user);
    if (!scope && user) {
      const { name, role, type } = user.scopes[0];
      setScope({ name, role, type });
    }
  }, [user]);
  const updateScope = e => {
    // TODO Split logic for user and team
    const name = e.target.value;
    const details = user.scopes.filter(s => s.handle === name)[0];
    console.log("DETAILS", details);
    const { role, type } = details;
    setScope({ name, role, type });
  };
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
