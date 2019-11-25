import AuthButton from "../buttons/auth";
import LinkButton from "../buttons/link";

export default ({ loggedIn, next }) => {
  return (
    <header>
      <h2>Tweet Review</h2>
      <LinkButton text="Settings" to="/settings" />
      <AuthButton loggedIn={loggedIn} next={next} />
      <style jsx>{`
        header {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </header>
  );
};
