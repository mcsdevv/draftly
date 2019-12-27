import useSWR from "swr";
import Cookies from "js-cookie";
import parseJwt from "../lib/parseJwt";

export const useProfile = () => {
  const id = Cookies.get("id_token");
  if (id) {
    const { email } = parseJwt(id);
    const { data, revalidate } = useSWR(
      `/api/user/details/${encodeURIComponent(email)}`
    );
    return { ...data, revalidateProfile: revalidate };
  } else {
    return {};
  }
};
