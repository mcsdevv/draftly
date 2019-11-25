import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import parseJwt from "../lib/parseJwt";

import Header from "../components/header";

export default () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function getUser() {
      const idLocal = Cookies.get("id_token");
      const userLocal = localStorage.getItem("user");
      if (idLocal && userLocal) {
        console.log("Existing user logged in:", userLocal);
        setUser(JSON.parse(userLocal));
      }
      if (idLocal && !userLocal) {
        const { email } = parseJwt(Cookies.get("id_token"));
        const res = await fetch(`/api/user/details/${email}`);
        const user = await res.json();
        localStorage.setItem("user", JSON.stringify(user));
        console.log("New user logged in:", user);
        setUser(user);
      }
      return null;
    }
    getUser();
  }, []);
  return (
    <>
      <Header loggedIn={user} />
    </>
  );
};
