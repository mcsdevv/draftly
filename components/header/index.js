import { useUserState } from "../../hooks/useUserState";

import AuthButton from "../buttons/auth";
import LinkButton from "../buttons/link";
import TeamPicker from "../team/picker";

export default function Header({ next }) {
  const user = useUserState();
  return (
    <header>
      <h2>Tweet Review</h2>
      <TeamPicker teamsList={user && user.teams} />
      <LinkButton text="Settings" to="/settings" />
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
