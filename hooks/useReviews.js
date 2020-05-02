import useSWR from "swr";

import { useScope } from "./";

export const useReviews = () => {
  const { scope } = useScope();
  const handle = scope?.handle;
  const { data, isValidating, revalidate } = useSWR(
    handle ? `/api/tweets/details/reviews/${handle}` : null
  );
  return { ...data, isValidating, revalidateReviews: revalidate };
};
