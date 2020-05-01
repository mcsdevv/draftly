import { useEffect } from "react";
import { useScope, useProfile } from "../../hooks/";

import Link from "../link";
import Select from "../select";

export default function ScopePicker() {
  const { scope, setScope, updateScope } = useScope();
  const { teams } = useProfile();
  useEffect(() => {
    if (!scope && teams) {
      setScope({ ...teams[0] });
    }
  }, [teams]);
  return teams !== undefined && scope ? (
    teams.length > 0 ? (
      <Select onChange={updateScope} options={teams} value={scope.handle} />
    ) : (
      <Link href="/api/auth/twitter/connect">+ Add New Team</Link>
    )
  ) : null;
}
