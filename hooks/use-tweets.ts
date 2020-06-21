import useSWR from "swr";

import useScope from "./use-scope";

export default function useTweets() {
  const [scope] = useScope();
  const tuid = scope?.tuid;
  const { data, isValidating, mutate: setTweets, revalidate } = useSWR(
    tuid ? `/api/tweets` : null
  );
  return { ...data, isValidating, revalidateTweets: revalidate, setTweets };
}
