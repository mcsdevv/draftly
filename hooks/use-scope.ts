// * Libraries
import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import useSWR from "swr";

// * Hooks
import useUser from "./use-user";

export default function useScope() {
  const { teams } = useUser();

  // * Set SWR fetcher options with scope if available
  const options = {
    fetcher: undefined,
    initiaData: {},
  };

  // TODO Look at removing initialData

  // TODO Look at moving this logic into useEffect

  // * Fetch scope from cache
  const { data: scope, revalidate: revalidateScope, mutate: setScope } = useSWR(
    "/scope",
    options
  );

  // * Get team handle from router
  const router = useRouter();
  const { handle } = router.query;

  const updateScope = (newHandle: string, newScope: any) => {
    console.log("NEW HANDLE", newHandle);
    console.log("NEW SCOPE", newScope);

    // * Get new path by replacing the handle with the new one
    const { asPath } = router;
    const hrefUrl = asPath.replace(`${handle}`, "[handle]");
    const asUrl = asPath.replace(`${handle}`, newHandle);

    console.log("HREF URL", hrefUrl);
    console.log("AS URL", hrefUrl);

    // TODO Why is this generating a page refresh?
    router.push(hrefUrl, asUrl, { shallow: true });

    // * Set the new scope with the one provided
    setScope({ ...newScope });
  };

  // * Update scope when either the handle or teams change
  useEffect(() => {
    function setNewScope() {
      console.log("SCOPE HANDLE", handle);
      console.log("SCOPE TEAMS", teams);
      // * Set first team as default scope if no handle (example - /dashboard)
      if (!handle && teams) {
        const newScope = teams[0];
        if (newScope) {
          Cookies.set("tuid", newScope?.tuid);
          setScope({ ...newScope });
        }
      }

      // * If handle and teams present, select team and update scope
      if (handle && teams) {
        const newScope = teams.find((t: any) => t.handle === handle);
        if (newScope) {
          Cookies.set("tuid", newScope?.tuid);
          setScope({ ...newScope });
        } else {
          // TODO Complete the handling of this case
          console.log("user not a member of this team...");
        }
      }
    }
    setNewScope();
  }, [handle, teams]);
  return { scope, setScope, revalidateScope, updateScope };
}
