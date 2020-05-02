import useSWR from "swr";

import { useScope } from "./";

export const usePublished = () => {
  const { scope } = useScope();
  const handle = scope?.handle;
  const { data, isValidating, revalidate } = useSWR(
    () => `/api/tweets/details/published/${handle}`
  );
  return { ...data, isValidating, revalidatePublished: revalidate };
};
