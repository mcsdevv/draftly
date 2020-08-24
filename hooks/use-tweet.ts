// * Libraries
import useSWR from "swr";

// * Helpers
import fetcher from "@lib/client/fetcher";

// * Hooks
import useScope from "./use-scope";

interface useTweetProps {
  twuid?: string;
}

export default function useTweet(twuid = null): useTweetProps {
  const { scope } = useScope();
  const tuid = scope?.tuid;

  const { data, revalidate: revalidateTweets, mutate: setTweets } = useSWR(
    tuid ? `/api/tweet?twuid=${twuid}` : null,
    fetcher
  );

  return { ...data, revalidateTweets, setTweets };
}
