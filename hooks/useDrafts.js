import useSWR from "swr";

import { useScope } from "./";

export const useDrafts = () => {
  const { scope } = useScope();
  const handle = scope?.handle;
  const { data, isValidating, revalidate } = useSWR(
    handle ? `/api/tweets/details/drafts/${handle}` : null
  );
  return { ...data, isValidating, revalidateDrafts: revalidate };
};
