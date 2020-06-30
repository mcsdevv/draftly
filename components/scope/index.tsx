import Cookies from "js-cookie";
import { useRouter } from "next/router";

import useScope from "@hooks/use-scope";
import useTweets from "@hooks/use-tweets";
import useUser from "@hooks/use-user";

import Link from "../link";
import Select from "../select";

const Scope = () => {
  const { scope, updateScope } = useScope();
  const { revalidateTweets } = useTweets();
  const { teams } = useUser();
  const router = useRouter();
  const handleOnChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const name = e.currentTarget.value;
    console.log("OLD SCOPE", scope);
    if (name === "new") {
      return router.push("/api/auth/twitter/connect");
    }
    const scopeDetails = teams.find((t: any) => t.handle === name);
    Cookies.set("tuid", scopeDetails?.tuid);
    revalidateTweets();
    console.log("NEW SCOPE", scope);
    console.log("SCOPE DETAILS", { ...scopeDetails });
    const { handle } = router.query;
    if (handle) {
      // const { asPath } = router;
      // const newUrl = asPath.replace(handle.toString(), scopeDetails.handle);
      // console.log("handle present", router.asPath, newUrl);
      // router.replace(newUrl);
      updateScope(scopeDetails.handle, { ...scopeDetails });
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
