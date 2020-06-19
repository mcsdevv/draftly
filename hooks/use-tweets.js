import useSWR from "swr";

import { useScope } from "./";

export const useTweets = () => {
  const [scope] = useScope();
  const tuid = scope?.tuid;
  const { data, isValidating, revalidate } = useSWR(
    tuid ? `/api/tweets/${tuid}` : null
  );
  return { ...data, isValidating, revalidateDrafts: revalidate };
};
