import { useContext } from "react";
import UserContext from "../../context/UserContext";

export default function ContextPicker() {
  const { scope, user, updateScope } = useContext(UserContext);
  console.log("USER SCOPES", user && user.scopes);
  return user && user.scopes ? (
    <select value={scope} onChange={updateScope}>
      {user.scopes.map(c => (
        <option key={c.name} value={c.name}>
          {c.name}
        </option>
      ))}
    </select>
  ) : null;
}
