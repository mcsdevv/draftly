// * Libraries
import Cookies from "js-cookie";
import { useState } from "react";
import { useRouter } from "next/router";

// * Hooks
import useScope from "@hooks/use-scope";
import useUser from "@hooks/use-user";

// * Modulz
import { Button, Flex } from "@modulz/radix";

// * Components
import Link from "@components/link";
import Scope from "@components/scope";

const Header = () => {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(!!Cookies.get("id_token"));
  const [loggingOut, setLoggingOut] = useState(false);
  const { scope } = useScope();
  const { teams } = useUser();
  const handle = scope?.handle;

  // * Send user to login
  const loginUser = () => {
    router.push("/login");
  };

  // * End session with Auth0, remove cookies and redirect to marketing page
  const logoutUser = async () => {
    // * Show logging out state for button
    setLoggingOut(true);

    // * Call logout endpoint to null the access_token
    await fetch("/api/auth/logout");

    // * Redirect to Auth0 and return to landing page
    window.location.href = `https://draftly.us.auth0.com/v2/logout?returnTo=${window.location.origin}`;

    // * Remove other cookies related to user session
    Cookies.remove("id_token");
    Cookies.remove("user_id");
    Cookies.remove("next");
    setLoggedIn(false);
  };

  return (
    <Flex
      as="header"
      sx={{ justifyContent: "space-between", margin: "16px 0" }}
    >
      <Flex>{loggedIn && <Scope />}</Flex>
      <Flex>
        {loggedIn && scope !== null && teams?.length > 0 && (
          <>
            <Link as={`/${handle}/tweets/new`} href="/[handle]/tweets/new">
              Create
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
            <Link
              as={`/${handle}/settings/account`}
              href="/[handle]/settings/account"
            >
              Settings
            </Link>
          </>
        )}
        <Button
          sx={{ cursor: "pointer", width: "96px" }}
          isWaiting={loggingOut}
          onClick={loggedIn ? logoutUser : loginUser}
          ml={loggedIn ? 4 : "auto"}
          size={0}
        >
          {loggedIn ? "Logout" : "Login"}
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
