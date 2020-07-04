// * Libraries
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

// * Hooks
import useScope from "@hooks/use-scope";

// * Components
import { Button, Flex } from "@modulz/radix";
import Link from "../../link";
import Scope from "../../scope";

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggingIn, setLoggingdIn] = useState(false);
  const { scope } = useScope();
  const handle = scope?.handle;
  const router = useRouter();

  // * Updated logged in state
  useEffect(() => {
    function getLoggedIn() {
      if (!!Cookies.get("id_token")) setLoggedIn(true);
    }
    getLoggedIn();
  }, [loggedIn]);

  // * Send user to login
  const loginUser = () => {
    setLoggingdIn(true);
    window.location.href = "/api/auth/login";
  };

  // * End session with Auth0, remove cookies and redirect to marketing page
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
    <Flex
      as="header"
      sx={{ justifyContent: "space-between", margin: "16px 0" }}
    >
      <Flex>{loggedIn && <Scope />}</Flex>
      <Flex>
        {loggedIn && (
          <>
            <Link as={`/${handle}/tweets/new`} href="/[handle]/tweets/new">
              Create Draft
            </Link>
            <Link
              as={`/${handle}/tweets/drafts`}
              href="/[handle]/tweets/drafts"
            >
              Drafts
            </Link>
            <Link
              as={`/${handle}/tweets/published`}
              href="/[handle]/tweets/published"
            >
              Published
            </Link>
            <Link as={`/${handle}/dashboard`} href="/[handle]/dashboard">
              Dashboard
            </Link>
            <Link as={`/${handle}/settings`} href="/[handle]/settings">
              Settings
            </Link>
          </>
        )}
        <Button
          sx={{ cursor: "pointer", width: "96px" }}
          isWaiting={loggingIn}
          onClick={loggedIn ? logoutUser : loginUser}
          ml={4}
          size={0}
        >
          {loggedIn ? "Logout" : "Login"}
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
