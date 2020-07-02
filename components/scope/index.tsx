// * Libraries
import Cookies from "js-cookie";
import { useRouter } from "next/router";

// * Hooks
import useScope from "@hooks/use-scope";
import useTweets from "@hooks/use-tweets";
import useUser from "@hooks/use-user";

// * Components
import Link from "../link";
import Select from "../select";

const Scope = () => {
  const { scope, updateScope } = useScope();
  const { revalidateTweets, setTweets } = useTweets();
  const { teams } = useUser();
  const router = useRouter();

  const handleOnChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const name = e.currentTarget.value;

    // * If name is new, redirect to Twitter auth
    if (name === "new") {
      return router.push("/api/auth/twitter/connect");
    }

    // * Get the details for the new scope
    const scopeDetails = teams.find((t: any) => t.handle === name);

    // * Update the cookie and revalidate tweets before scope change submitted
    Cookies.set("tuid", scopeDetails?.tuid);
    setTweets([]);
    revalidateTweets();

    // * Update the scope
    updateScope(scopeDetails.handle, { ...scopeDetails });
  };

  return scope !== null && teams ? (
    teams?.length ? (
      <Select
        onChange={handleOnChange}
        options={teams}
        value={scope?.handle || scope.name}
      />
    ) : (
      <Link href="/api/auth/twitter/connect">+ Add New Team</Link>
    )
  ) : null;
};

export default Scope;
