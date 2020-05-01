import { useEffect } from "react";
import { useScope, useProfile } from "../../hooks/";

import Link from "../link";
import Select from "../select";

export default function ScopePicker() {
  const { scope, setScope, updateScope } = useScope();
  const { teams } = useProfile();
  useEffect(() => {
    if (scope === null && teams) {
      setScope({ ...teams[0] });
    }
  }, [teams]);
  return teams !== undefined ? (
    teams?.length > 0 ? (
      <Select
        onChange={updateScope}
        options={teams}
        value={(scope && scope.handle) || scope.name}
      />
    ) : (
      <Link href="/api/auth/twitter/connect">+ Add New Team</Link>
    )
  ) : null;
}
