import AuthButton from "../buttons/auth";

export default ({ loggedIn, logout }) => {
  return (
    <header>
      <h2>Tweet Review</h2>
      <AuthButton loggedIn={loggedIn} logout={logout} />
      <style jsx>{`
        header {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </header>
  );
};
