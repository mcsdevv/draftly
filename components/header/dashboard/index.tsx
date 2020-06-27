import { useEffect, useState } from "react";

import Cookies from "js-cookie";

import Link from "../../link";
import Scope from "../../scope";
import styles from "./header.module.css";

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    function getLoggedIn() {
      if (!!Cookies.get("id_token")) setLoggedIn(true);
    }
    getLoggedIn();
  }, [loggedIn]);
  const logoutUser = async () => {
    await fetch("/api/auth/logout");
    Cookies.remove("id_token");
    Cookies.remove("access_token");
    Cookies.remove("user_id");
    Cookies.remove("next");
    setLoggedIn(false);
    window.location.href = "/";
  };
  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>{loggedIn && <Scope />}</div>
      <div className={styles.headerRight}>
        {loggedIn && (
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
          href={loggedIn ? "/" : "/dashboard"}
          onClick={loggedIn ? logoutUser : undefined}
          type="tertiary"
        >
          {loggedIn ? "Logout" : "Login"}
        </Link>
      </div>
    </header>
  );
};

export default Header;
