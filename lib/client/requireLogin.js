import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import parseJwt from "@lib/client/parseJwt";

const RequireLogin = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState();
  const router = useRouter();
  const redirectToLogin = () => {
    Cookies.set("next", router.pathname);
    router.push("/api/auth/login");
  };
  useEffect(() => {
    function getLoggedIn() {
      const id = Cookies.get("id_token");
      console.log("LOGGED IN");

      // * Check that the token exists
      if (!id) {
        redirectToLogin();
      }
      try {
        // * Check that the token is correctly formed
        const parsed = parseJwt(id);

        // * Check that the token has not expired
        if (parsed.exp * 1000 > Date.now()) {
          setLoggedIn(true);
        } else {
          redirectToLogin();
        }
      } catch (err) {
        console.error(err);
        redirectToLogin();
      }
    }
    getLoggedIn();
  }, []);
  return loggedIn ? children : null;
};

export default RequireLogin;
