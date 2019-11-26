import { useContext } from "react";
import UserContext from "../context/UserContext";

import Header from "../components/header";

export default function Landing() {
  const { user } = useContext(UserContext);
  console.log("USER", user);
  return (
    <>
      <Header />
      <h1>Really great marketing content...</h1>
    </>
  );
}
