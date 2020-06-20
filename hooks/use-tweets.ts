import useSWR from "swr";

import useScope from "./use-scope";

export default function useTweets() {
  const [scope] = useScope();
  const tuid = scope?.tuid;
  const { data, isValidating, mutate: setTweets, revalidate } = useSWR(
    tuid ? `/api/tweets/${tuid}` : null
  );
  return { ...data, isValidating, revalidateDrafts: revalidate, setTweets };
}
