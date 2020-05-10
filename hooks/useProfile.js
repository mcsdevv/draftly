import useSWR from "swr";
import Cookies from "js-cookie";

export const useProfile = () => {
  const id = Cookies.get("id_token");
  if (id) {
    const { data, revalidate } = useSWR(`/api/user/details`);
    return { ...data, revalidateProfile: revalidate };
  } else {
    return { user: null };
  }
};
