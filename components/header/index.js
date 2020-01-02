import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useProfile, useScope } from "../../hooks/";

import Cookies from "js-cookie";

import AuthButton from "../buttons/auth";
import LinkButton from "../buttons/link";
import ScopePicker from "../scope/picker";

export default function Header() {
  // TODO Move AuthButton into its own login page
  const { user } = useProfile();
  const { scope } = useScope();
  const router = useRouter();
  const logoutUser = async () => {
    const res = await fetch("/api/auth/logout");
    if (res.status === 200) {
      Cookies.remove("id_token");
      Cookies.remove("access_token");
      Cookies.remove("next");
      localStorage.removeItem("teams");
      localStorage.removeItem("user");
      window.location = "/";
    }
  };
  const [isLanding, setLandingState] = useState(undefined);
  useEffect(() => {
    function getLandingState() {
      setLandingState(router.pathname === "/");
    }
    getLandingState();
  }, [router.pathname]);
  return (
    <header>
      <h1 className="text-4xl">Tweet Review</h1>
      {!isLanding && <ScopePicker />}
      {!isLanding && <LinkButton text="Dashboard" to="/dashboard" />}
      {!isLanding && scope && !scope.personal && (
        <LinkButton text="Tweets" to="/tweets" />
      )}
      {!isLanding && <LinkButton text="Settings" to="/settings" />}
      <AuthButton loggedIn={!!user} logout={logoutUser} next="/dashboard" />
      <style jsx>{`
        header {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </header>
  );
}
