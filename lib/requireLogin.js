import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function RequireLogin(Component) {
  const [loggedIn, setLoggedIn] = useState();
  const router = useRouter();
  useEffect(() => {
    const id = Cookies.get("id_token");
    if (id) setLoggedIn(true);
    if (!id) {
      Cookies.set("next", router.pathname);
      window.location = `/api/auth/login`;
    }
  }, []);
  return loggedIn ? <Component /> : null;
}
