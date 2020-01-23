import useSWR from "swr";

export const useReviews = () => {
  const scope = localStorage.getItem("scope");
  const scopeParsed = JSON.parse(scope);
  const { handle } = scopeParsed;
  const { data, isValidating, revalidate } = useSWR(
    `/api/tweets/details/reviews/${handle}`
  );
  return { ...data, isValidating, revalidateReviews: revalidate };
};
