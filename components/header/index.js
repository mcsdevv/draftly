import { useProfile } from "../../hooks/";
import { useRouter } from "next/router";

import Cookies from "js-cookie";

import Link from "../link";
import ScopePicker from "../scope/picker";
import styles from "./header.module.css";

const Header = () => {
  const { user } = useProfile();
  const router = useRouter();
  const logoutUser = () => {
    fetch("/api/auth/logout");
    Cookies.remove("id_token");
    Cookies.remove("access_token");
    Cookies.remove("next");
    localStorage.removeItem("scope");
    localStorage.removeItem("teams");
    localStorage.removeItem("user");
    router.push("/");
  };
  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <h1 className={styles.brand}>T/R</h1>
        {user && <ScopePicker />}
      </div>
      <div className={styles.headerRight}>
        {user && (
          <>
            <Link href="/tweets/drafts" type="primary">
              Drafts
            </Link>
            <Link href="/tweets/reviews" type="primary">
              Reviews
            </Link>
            <Link href="/tweets/published" type="primary">
              Published
            </Link>
            <Link href="/dashboard" type="secondary">
              Dashboard
            </Link>
            <Link href="/settings" type="secondary">
              Settings
            </Link>
          </>
        )}
        <Link
          href={user ? "/" : "/dashboard"}
          onClick={user ? logoutUser : null}
          type="tertiary"
        >
          {user ? "Logout" : "Login"}
        </Link>
      </div>
    </header>
  );
};

export default Header;
