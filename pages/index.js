import { useUserState } from "../hooks/useUserState";

import Header from "../components/header";

export default function Landing() {
  const user = useUserState();
  console.log("USER", user);
  return (
    <>
      <Header />
      <h1>Really great marketing content...</h1>
    </>
  );
}
