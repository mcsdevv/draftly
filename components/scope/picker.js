import { useEffect } from "react";
import { useScope, useProfile } from "../../hooks/";

import { Select } from "@chakra-ui/core";

export default function ScopePicker() {
  const { scope, setScope, updateScope } = useScope();
  const { teams } = useProfile();
  useEffect(() => {
    if (scope === null && teams) {
      setScope({ ...teams[0] });
    }
  }, [teams]);
  return scope ? (
    <Select
      maxW="sm"
      mx="2"
      onChange={updateScope}
      value={(scope && scope.handle) || scope.name}
    >
      {teams &&
        teams.map(t => (
          <option key={t.name} value={t.handle}>
            {t.name}
          </option>
        ))}
      <option value="new">+ Add New Team</option>
    </Select>
  ) : null;
}
