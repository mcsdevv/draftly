// * Libraries
import useSWR from "swr";

// * Helpers
import fetcher from "@lib/client/fetcher";

// * Hooks
import useScope from "./use-scope";

export default function useDrafts(limit: number = 10, page: number = 1): any {
  const { scope } = useScope();
  const tuid = scope?.tuid;

  const { data, mutate: setDrafts } = useSWR(
    tuid ? `/api/tweets/drafts?limit=${limit}&page=${page}` : null,
    fetcher
  );

  return { ...data, setDrafts };
}
