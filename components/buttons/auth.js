import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default ({ loggedIn, next }) => {
  const router = useRouter();
  const logout = async () => {
    const res = await fetch("/api/auth/logout");
    if (res.status === 200) {
      Cookies.remove("id_token");
      Cookies.remove("access_token");
      localStorage.removeItem("user");
      router.push("/");
    }
  };
  return !loggedIn ? (
    <Link href={`/api/auth/login/${next || "dashboard"}`}>
      <a>
        <button>Login</button>
      </a>
    </Link>
  ) : (
    <button onClick={logout}>Logout</button>
  );
};
