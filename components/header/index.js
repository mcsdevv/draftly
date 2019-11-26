import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";

import AuthButton from "../buttons/auth";
import LinkButton from "../buttons/link";
import ContextPicker from "../scope/picker";

export default function Header({ next }) {
  const { user } = useContext(UserContext);
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
