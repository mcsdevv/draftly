import useSWR from "swr";

import { useScope } from "./";

export const useTweets = () => {
  // const { scope } = useScope();
  // const handle = scope?.handle;
  const { data, isValidating, revalidate } = useSWR(
    `/api/tweets/1d5a22ca-4807-4f49-ad5d-3217dd98955b`
  );
  return { ...data, isValidating, revalidateDrafts: revalidate };
};
