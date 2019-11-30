import Link from "next/link";

export default ({ loggedIn, logout, next }) => {
  return !loggedIn ? (
    <Link href={`/api/auth/login/${next || "dashboard"}`}>
      <button>Login</button>
    </Link>
  ) : (
    <button onClick={logout}>Logout</button>
  );
};
