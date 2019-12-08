import useSWR from "swr";
import Cookies from "js-cookie";
import parseJwt from "../lib/parseJwt";

export const useUser = () => {
  const id = Cookies.get("id_token");
  if (id) {
    const { email } = parseJwt(id);
    const { data: user } = useSWR(
      `/api/user/details/${encodeURIComponent(email)}`
    );
    return { user };
  } else {
    return {};
  }
};
