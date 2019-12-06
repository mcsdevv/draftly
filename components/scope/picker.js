import { useContext } from "react";
import ScopeContext from "../../context/scopeContext";
import { useUser } from "../../hooks/useUser";

export default function ScopePicker() {
  const { scope, updateScope } = useContext(ScopeContext);
  console.log("SCOPEYYYYY", scope);
  const user = useUser();
  return user && user.scopes ? (
    <select value={scope || user.scopes[0].name} onChange={updateScope}>
      {user.scopes.map(c => (
        <option key={c.name} value={c.name}>
          {c.name}
        </option>
      ))}
      <option value="new">+ Add New Team</option>
    </select>
  ) : null;
}
