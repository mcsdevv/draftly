import { useContext } from "react";
import UserContext from "../context/UserContext";

export default function Dashboard() {
  const { user } = useContext(UserContext);

  return (
    <>
      <h2>Dashboard</h2>
      <style jsx>{``}</style>
    </>
  );
}
