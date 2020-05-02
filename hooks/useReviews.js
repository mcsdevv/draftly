import useSWR from "swr";

import { useScope } from "./";

export const useReviews = () => {
  const { scope } = useScope();
  const handle = scope?.handle;
  const { data, isValidating, revalidate } = useSWR(
    () => `/api/tweets/details/reviews/${handle}`
  );
  return { ...data, isValidating, revalidateReviews: revalidate };
};
