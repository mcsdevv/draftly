// * Libraries
import useSWR from "swr";

// * Helpers
import fetcher from "@lib/client/fetcher";

// * Hooks
import useScope from "./use-scope";

export default function useTweets() {
  const { scope } = useScope();
  const tuid = scope?.tuid;

  const { data, revalidate: revalidateTweets, mutate: setTweets } = useSWR(
    tuid ? `/api/tweets` : null,
    fetcher
  );

  return { ...data, revalidateTweets, setTweets };
}
