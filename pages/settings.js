import { useContext } from "react";
import UserContext from "../context/UserContext";

import Header from "../components/header";

export default function Settings() {
  const { scope, user } = useContext(UserContext);
  return (
    <>
      <Header />
      <main>
        <h1>Settings Page</h1>
        {scope}
      </main>
      <style jsx>{``}</style>
    </>
  );
}
