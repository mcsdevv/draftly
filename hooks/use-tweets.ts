// * Libraries
import useSWR from "swr";
import { stringify } from "querystring";

// * Helpers
import fetcher from "@lib/client/fetcher";

// * Hooks
import useScope from "./use-scope";

export default function useTweets(
  draftLimit: number = 10,
  draftPage: number = 1,
  publishedLimit: number = 10,
  publishedPage: number = 1
): any {
  const { scope } = useScope();
  const tuid = scope?.tuid;

  // * Format query string
  const query = stringify({
    draftLimit,
    draftPage,
    publishedLimit,
    publishedPage,
  });

  const { data, mutate: setTweets } = useSWR(
    tuid ? `/api/tweets?${query}` : null,
    fetcher
  );

  return { ...data, setTweets };
}
