// * Libraries
import useSWR from "swr";

// * Helpers
import fetcher from "@lib/client/fetcher";

// * Hooks
import useScope from "./use-scope";

export default function useTweet(twuid: string = "") {
  const { scope } = useScope();
  const tuid = scope?.tuid;

  const { data, mutate: setTweet } = useSWR(
    tuid ? `/api/tweet?twuid=${twuid}` : null,
    fetcher
  );

  return { ...data, setTweet };
}
