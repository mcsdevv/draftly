// * Libraries
import useSWR from "swr";
import { stringify } from "querystring";

// * Helpers
import fetcher from "@lib/client/fetcher";

// * Hooks
import useScope from "./use-scope";

export default function useTweet(twuid: string = "") {
  const { scope } = useScope();
  const tuid = scope?.tuid;

  // * Format query string
  const query = stringify({
    twuid,
  });

  const { data, mutate: setTweet } = useSWR(
    tuid ? `/api/tweet?${query}` : null,
    fetcher
  );

  return { ...data, setTweet };
}
