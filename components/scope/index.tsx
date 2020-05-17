import { useProfile, useScope } from "../../hooks";
import { useRouter } from "next/router";

import Link from "../link";
import Select from "../select";

const Scope = () => {
  const { scope, setStoredScope } = useScope();
  const { teams } = useProfile();
  const router = useRouter();
  const handleOnChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const name = e.currentTarget.value;
    if (name === "new") {
      return router.push("/api/auth/twitter/connect");
    }
    const scopeDetails = teams.find((t: any) => t.handle === name);
    setStoredScope(scopeDetails);
  };
  console.log("teams", teams);
  return scope !== null && teams ? (
    teams?.length ? (
      <Select
        onChange={handleOnChange}
        options={teams}
        value={(scope && scope.handle) || scope.name}
      />
    ) : (
      <Link href="/api/auth/twitter/connect">+ Add New Team</Link>
    )
  ) : null;
};

export default Scope;
