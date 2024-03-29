// * Libraries
import useSWR from "swr";
import Cookies from "js-cookie";

// * Helpers
import fetcher from "@lib/client/fetcher";

export default function useUser() {
  const token = Cookies.get("id_token");

  const { data, mutate: setUser } = useSWR(token ? `/api/user` : null, fetcher);

  return { ...data, setUser };
}
