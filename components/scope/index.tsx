import { useRouter } from "next/router";

import useScope from "@hooks/use-scope";
import useUser from "@hooks/use-user";

import Link from "../link";
import Select from "../select";

const Scope = () => {
  const [scope, setScope] = useScope();
  const { teams } = useUser();
  const router = useRouter();
  const handleOnChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const name = e.currentTarget.value;
    if (name === "new") {
      return router.push("/api/auth/twitter/connect");
    }
    const scopeDetails = teams.find((t: any) => t.handle === name);
    setScope(scopeDetails);
    const { handle } = router.query;
    if (handle) {
      const { asPath } = router;
      const newUrl = asPath.replace(handle.toString(), scopeDetails.handle);
      console.log("handle present", router.asPath, newUrl);
      router.replace(newUrl);
    }
  };
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
