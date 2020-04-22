import { useEffect } from "react";
import { useScope, useProfile } from "../../hooks/";

import Select from "../select";

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
      onChange={updateScope}
      options={teams}
      value={(scope && scope.handle) || scope.name}
    />
  ) : null;
}
