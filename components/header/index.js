import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Cookies from "js-cookie";

import Link from "../link";
import ScopePicker from "../scope/picker";
import styles from "./header.module.css";

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    function getLoggedIn() {
      if (!!Cookies.get("id_token")) setLoggedIn(true);
    }
    getLoggedIn();
  });
  const router = useRouter();
  const loginUser = () => {
    Cookies.set("next", "dashboard");
    router.push("/api/auth/login");
  };
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
        {loggedIn && <ScopePicker />}
      </div>
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
        {/* CHANGE TO BUTTON ASAP */}
        <Button
          // href={loggedIn ? "/" : "/dashboard"}
          onClick={loggedIn ? logoutUser : loginUser}
          type="tertiary"
        >
          {loggedIn ? "Logout" : "Login"}
        </Button>
      </div>
    </header>
  );
};

export default Header;
