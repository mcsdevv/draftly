import { useContext } from "react";
import UserContext from "../context/UserContext";

export default function Landing() {
  const { user } = useContext(UserContext);
  console.log("USER", user);
  return (
    <>
      <h1>Really great marketing content...</h1>
    </>
  );
}
