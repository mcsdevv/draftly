// * Libraries
import Cookies from "js-cookie";
import { useRouter } from "next/router";

// * Hooks
import useScope from "@hooks/use-scope";
import useTweets from "@hooks/use-tweets";
import useUser from "@hooks/use-user";

// * Modulz
import { Option, Select } from "@modulz/radix";

// * Components
import Link from "../link";

const Scope = () => {
  const { scope, updateScope } = useScope();
  const { revalidateTweets, setTweets } = useTweets();
  const { teams } = useUser();
  const router = useRouter();

  const handleOnChange = (name?: string) => {
    // * If the select scope hasn't changed, do nothing
    if (name === scope?.name) return;
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
        onValueChange={handleOnChange}
        value={scope?.handle || scope.name}
      >
        {teams?.map((o: any) => (
          <Option key={o.name} value={o.handle} label={o.name} />
        ))}
        <option value="new">+ Add New Team</option>
      </Select>
    ) : (
      <Link href="/api/auth/twitter/connect">+ Add New Team</Link>
    )
  ) : null;
};

export default Scope;
