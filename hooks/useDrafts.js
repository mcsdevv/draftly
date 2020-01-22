import useSWR from "swr";

export const useDrafts = () => {
  const scope = localStorage.getItem("scope");
  const scopeParsed = JSON.parse(scope);
  const { handle } = scopeParsed;
  const { data, isValidating, revalidate } = useSWR(
    `/api/tweets/details/drafts/${handle}`
  );
  return { ...data, isValidating, revalidateDrafts: revalidate };
};
