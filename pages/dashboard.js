import { useContext } from "react";
import UserContext from "../context/UserContext";

export default function Dashboard() {
  const { user } = useContext(UserContext);

  return (
    <>
      <h1>Dashboard</h1>
      <style jsx>{``}</style>
    </>
  );
}
