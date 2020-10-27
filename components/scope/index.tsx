// * Libraries
import Cookies from "js-cookie";
import { useRouter } from "next/router";

// * Hooks
import useDrafts from "@hooks/use-drafts";
import usePublished from "@hooks/use-published";
import useScope from "@hooks/use-scope";
import useUser from "@hooks/use-user";

// * Modulz
import { Option, Select } from "@modulz/radix";

// * Components
import Link from "@components/link";

const Scope = () => {
  const { setDrafts } = useDrafts();
  const { setPublished } = usePublished();
  const { scope, updateScope } = useScope();
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
    setDrafts([]);
    setPublished([]);

    // * Update the scope
    updateScope(scopeDetails.handle, { ...scopeDetails });
  };

  return scope !== null && teams ? (
    teams?.length ? (
      <Select onValueChange={handleOnChange} value={scope?.handle}>
        {teams?.map((o: any) => (
          <Option key={o.name} value={o.handle} label={o.name} />
        ))}
        <Option value="new" label="+ Add New Team" />
      </Select>
    ) : (
      <Link href="/api/auth/twitter/connect" noMargin width="120px">
        + Add New Team
      </Link>
    )
  ) : null;
};

export default Scope;
