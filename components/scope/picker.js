import { useScope, useUser } from "../../hooks/";

export default function ScopePicker() {
  const { scope, updateScope } = useScope();
  const { teams, user } = useUser();
  console.log("SCOPE", scope, user);
  return user ? (
    <select
      value={scope ? scope.handle || scope.name : user.name}
      onChange={updateScope}
    >
      <option value={user.email}>{user.name}</option>
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
