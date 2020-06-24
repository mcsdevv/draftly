import useSWR from "swr";

import useScope from "./use-scope";

export default function useTweets() {
  const [scope] = useScope();
  const tuid = scope?.tuid;
  const { data, mutate: setTweets } = useSWR(tuid ? `/api/tweets` : null);
  return { ...data, setTweets };
}
