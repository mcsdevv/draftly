// * Libraries
import useSWR from "swr";
import { stringify } from "querystring";

// * Helpers
import fetcher from "@lib/client/fetcher";

// * Hooks
import useScope from "./use-scope";

export default function useDrafts(limit: number = 10, page: number = 1): any {
  const { scope } = useScope();
  const tuid = scope?.tuid;

  // * Format query string
  const query = stringify({
    limit,
    page,
  });

  console.log('TUID', tuid);

  const { data, mutate: setDrafts } = useSWR(
    tuid ? `/api/tweets/drafts?${query}` : null,
    fetcher
  );

  return { ...data, setDrafts };
}
