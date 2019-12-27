import Link from "next/link";
import Cookies from "js-cookie";

export default ({ loggedIn, logout, next }) => {
  const setNext = () => {
    Cookies.set("next", next);
  };
  return !loggedIn ? (
    <Link href={`/api/auth/login`}>
      <button onClick={setNext}>Login</button>
    </Link>
  ) : (
    <button onClick={logout}>Logout</button>
  );
};
