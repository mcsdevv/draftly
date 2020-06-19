import useSWR from "swr";
import Cookies from "js-cookie";

export const useUser = () => {
  const uid = Cookies.get("uid");
  const { data, revalidate } = useSWR(uid ? `/api/user` : null);
  return { ...data, revalidateProfile: revalidate };
};
