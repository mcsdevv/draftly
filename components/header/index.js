import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import UserContext from "../../context/UserContext";

import AuthButton from "../buttons/auth";
import LinkButton from "../buttons/link";
import ContextPicker from "../scope/picker";

export default function Header({ next }) {
  const { user } = useContext(UserContext);
  const [isLanding, setLandingState] = useState(undefined);
  const router = useRouter();
  useEffect(() => {
    function getLandingState() {
      setLandingState(router.pathname === "/");
    }
    getLandingState();
  }, [router.pathname]);
  return (
    <header>
      <h2>Tweet Review</h2>
      {!isLanding && <ContextPicker />}
      {!isLanding && <LinkButton text="Tweets" to="/tweets" />}
      {isLanding && <LinkButton text="Dashboard" to="/dashboard" />}
      {!isLanding && <LinkButton text="Settings" to="/settings" />}
      <AuthButton loggedIn={!!user} next={next || "dashboard"} />
      <style jsx>{`
        header {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </header>
  );
}
