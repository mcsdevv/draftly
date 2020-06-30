// * Libraries
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

// * Hooks
import useScope from "@hooks/use-scope";

// * Components
import Link from "../../link";
import Scope from "../../scope";
import styles from "./header.module.css";

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const { scope } = useScope();
  const handle = scope?.handle;
  const router = useRouter();
  useEffect(() => {
    function getLoggedIn() {
      if (!!Cookies.get("id_token")) setLoggedIn(true);
    }
    getLoggedIn();
  }, [loggedIn]);
  const logoutUser = async () => {
    fetch("/api/auth/logout");
    Cookies.remove("id_token");
    Cookies.remove("access_token");
    Cookies.remove("user_id");
    Cookies.remove("next");
    setLoggedIn(false);
    router.push("/");
  };
  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>{loggedIn && <Scope />}</div>
      <div className={styles.headerRight}>
        {loggedIn && (
          <>
            <Link
              as={`/${handle}/tweets/new`}
              href="/[handle]/tweets/new"
              type="primary"
            >
              Create Draft
            </Link>
            <Link
              as={`/${handle}/tweets/drafts`}
              href="/[handle]/tweets/drafts"
              type="primary"
            >
              Drafts
            </Link>
            <Link
              as={`/${handle}/tweets/published`}
              href="/[handle]/tweets/published"
              type="primary"
            >
              Published
            </Link>
            <Link
              as={`/${handle}/dashboard`}
              href="/[handle]/dashboard"
              type="secondary"
            >
              Dashboard
            </Link>
            <Link
              as={`/${handle}/settings`}
              href="/[handle]/settings"
              type="secondary"
            >
              Settings
            </Link>
          </>
        )}
        <Link
          href={loggedIn ? "/" : `/api/auth/login`}
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
