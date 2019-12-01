import { useContext } from "react";
import UserContext from "../../context/UserContext";

export default function ScopetPicker() {
  const { scope, user, updateScope } = useContext(UserContext);
  return user && user.scopes ? (
    <select value={scope} onChange={updateScope}>
      {user.scopes.map(c => (
        <option key={c.name} value={c.name}>
          {c.name}
        </option>
      ))}
      <option value="new">+ Add New Team</option>
    </select>
  ) : null;
}
