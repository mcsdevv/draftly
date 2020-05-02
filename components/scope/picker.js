import { useProfile, useScope } from "../../hooks/";
import { useRouter } from "next/router";

import Link from "../link";
import Select from "../select";

export default function ScopePicker() {
  const { scope, setStoredScope } = useScope();
  const { teams } = useProfile();
  const router = useRouter();
  const handleOnChange = (e) => {
    const name = e.target.value;
    if (name === "new") {
      return router.push("/api/auth/twitter/connect");
    }
    const scopeDetails = teams.find((t) => t.handle === name);
    setStoredScope(scopeDetails);
  };
  return teams?.length > 0 ? (
    scope ? (
      <Select
        onChange={handleOnChange}
        options={teams}
        value={(scope && scope.handle) || scope.name}
      />
    ) : (
      <Link href="/api/auth/twitter/connect">+ Add New Team</Link>
    )
  ) : null;
}
