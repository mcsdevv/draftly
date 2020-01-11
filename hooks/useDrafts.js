import useSWR from "swr";

export const useDrafts = () => {
  const scope = localStorage.getItem("scope");
  const scopeParsed = JSON.parse(scope);
  const { handle } = scopeParsed;
  const { data, revalidate } = useSWR(`/api/tweets/details/drafts/${handle}`);
  return { drafts: data, revalidateDrafts: revalidate };
};
