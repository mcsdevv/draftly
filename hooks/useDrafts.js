import useSWR from "swr";

export const useDrafts = () => {
  console.log("getDrafts");
  const scope = localStorage.getItem("scope");
  const scopeParsed = JSON.parse(scope);
  const handle = scopeParsed?.handle;
  console.log("handle", handle);
  const { data, isValidating, revalidate } = useSWR(
    `/api/tweets/details/drafts/${handle}`
  );
  console.log("drafts", data);
  return { ...data, isValidating, revalidateDrafts: revalidate };
};
