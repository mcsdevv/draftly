// * Libraries
import useSWR from "swr";
import { stringify } from "querystring";

// * Helpers
import fetcher from "@lib/client/fetcher";

// * Hooks
import useScope from "./use-scope";

export default function usePublished(
  limit: number = 10,
  page: number = 1
): any {
  const { scope } = useScope();
  const tuid = scope?.tuid;

  // * Format query string
  const query = stringify({
    limit,
    page,
  });

  const { data, mutate: setPublished } = useSWR(
    tuid ? `/api/tweets/published?${query}` : null,
    fetcher
  );

  return { ...data, setPublished };
}
