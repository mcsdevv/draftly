import useSWR from "swr";

import { useScope } from "./";

export const useDrafts = () => {
  const { scope } = useScope();
  const handle = scope?.handle;
  const { data, isValidating, revalidate } = useSWR(
    () => `/api/tweets/details/drafts/${handle}`
  );
  return { ...data, isValidating, revalidateDrafts: revalidate };
};
