// * Libraries
import useSWR from "swr";

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

  const { data, mutate: setPublished } = useSWR(
    tuid ? `/api/tweets/published?limit=${limit}&page=${page}` : null,
    fetcher
  );

  return { ...data, setPublished };
}
