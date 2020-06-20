import useSWR from "swr";
import Cookies from "js-cookie";

export default function useUser() {
  const token = Cookies.get("id_token");
  const { data, mutate: setUser, revalidate } = useSWR(
    token ? `/api/user` : null
  );
  return { ...data, revalidateProfile: revalidate, setUser };
}
