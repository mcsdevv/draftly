import { useContext } from "react";
import UserContext from "../context/UserContext";

export default function Settings() {
  const { scope, user } = useContext(UserContext);
  return (
    <>
      <main>
        <h1>Settings Page</h1>
        {scope}
      </main>
      <style jsx>{``}</style>
    </>
  );
}
