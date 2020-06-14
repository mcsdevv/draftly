import useSWR from "swr";

export const useUser = () => {
  const { data, revalidate } = useSWR(() => `/api/user`);
  return { ...data, revalidateProfile: revalidate };
};
