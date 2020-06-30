import useSWR from "swr";

import useScope from "./use-scope";

export default function useTweets() {
  const { scope } = useScope();
  const tuid = scope?.tuid;
  const { data, revalidate: revalidateTweets, mutate: setTweets } = useSWR(
    tuid ? `/api/tweets` : null
  );

  //  TODO Use isValidating to show loading when tweets revalidate on scope change

  return { ...data, revalidateTweets, setTweets };
}
