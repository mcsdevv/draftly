import { useEffect, useState } from "react";
import { useUserState } from "../../hooks/useUserState";

import AuthButton from "../buttons/auth";
import LinkButton from "../buttons/link";
import ContextPicker from "../context/picker";

export default function Header({ next }) {
  const user = useUserState();
  const [landing, setLandingState] = useState(undefined);
  useEffect(() => {
    function getLandingState() {
      if (window.location.pathname === "/") {
        setLandingState(true);
      }
    }
    getLandingState();
  }, []);
  return (
    <header>
      <h2>Tweet Review</h2>
      {!landing && <ContextPicker />}
      {landing && <LinkButton text="Dashboard" to="/dashboard" />}
      {!landing && <LinkButton text="Settings" to="/settings" />}
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
