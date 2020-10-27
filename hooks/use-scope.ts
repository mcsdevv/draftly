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

  // * Fetch scope from cache
  const { data: scope, mutate: setScope } = useSWR("/scope", options);

  // * Get team handle and twuid (if present) from router
  const router = useRouter();
  const { handle, twuid } = router.query;

  const updateScope = (newHandle: string, newScope: any) => {
    // * Get the current pathname
    const { asPath } = router;

    // * Format URL's to satisfy both href and as
    let hrefUrl = asPath.replace(`${handle}`, "[handle]");
    let asUrl = asPath.replace(`${handle}`, newHandle);

    // * Redirect to /tweets/drafts if twuid present
    if (twuid) {
      hrefUrl = hrefUrl.slice(0, -37);
      asUrl = asUrl.slice(0, -37);
    }

    // * Update the URL to reflect change in scope
    router.push(hrefUrl, asUrl, { shallow: true });

    // * Set the new scope with the one provided
    setScope({ ...newScope });
  };

  // * Update scope when either the handle or teams change
  useEffect(() => {
    function setNewScope() {
      // * Set first team as default scope if no handle (example - /dashboard)
      if (!handle && teams?.length) {
        const newScope = teams[0];
        if (newScope) {
          Cookies.set("tuid", newScope?.tuid);
          setScope({ ...newScope });
        }
      }

      // * If handle and teams present, select team and update scope
      if (handle && teams?.length) {
        const newScope = teams.find((t: any) => t.handle === handle);
        if (newScope) {
          Cookies.set("tuid", newScope?.tuid);
          setScope({ ...newScope });
        } else {
          // TODO Complete the handling of this case
        }
      }
    }
    setNewScope();
  }, [handle, teams]);
  return { scope, setScope, updateScope };
}
