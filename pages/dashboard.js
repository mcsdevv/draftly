import { useContext } from "react";
import UserContext from "../context/UserContext";

export default function Dashboard() {
  const { user } = useContext(UserContext);

  return (
    <>
      <h1>Dashboard</h1>
      <h3>
        Hello {user && user.name}, the following items need your attention:
      </h3>
      <ul>
        <li>New Scheduled Tweets</li>
        <li>New Drafts</li>
        <li>Outstanding Reviews</li>
      </ul>
      <style jsx>{``}</style>
    </>
  );
}
