import { useUserState } from "../hooks/useUserState";

import Header from "../components/header";

export default () => {
  const user = useUserState();
  console.log("USER", user);
  return (
    <>
      <Header loggedIn={user} />
      <h1>Really great marketing content...</h1>
    </>
  );
};
