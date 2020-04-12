import useSWR from "swr";

export const usePublished = () => {
  const scope = localStorage.getItem("scope");
  const scopeParsed = JSON.parse(scope);
  const handle = scopeParsed?.handle;
  const { data, isValidating, revalidate } = useSWR(
    `/api/tweets/details/published/${handle}`
  );
  return { ...data, isValidating, revalidatePublished: revalidate };
};
