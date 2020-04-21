import { useProfile } from "../../hooks/";
import { useRouter } from "next/router";

import Cookies from "js-cookie";

import ScopePicker from "../scope/picker";
import { Box, Heading } from "@chakra-ui/core";

import Link from "../link";

export default function Header() {
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
  const loggedIn = Cookies.get("id_token");
  return (
    <Box
      as="header"
      display="flex"
      h="72px"
      justifyContent="space-between"
      py="4"
    >
      <Box display="flex">
        <Heading as="h1" size="xl">
          T/R
        </Heading>
        {user && <ScopePicker />}
      </Box>
      <Box>
        {loggedIn && (
          <>
            <Link href="/tweets/drafts">Drafts</Link>
            <Link href="/tweets/reviews">Reviews</Link>
            <Link href="/tweets/published">Published</Link>
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
          onClick={loggedIn ? logoutUser : null}
          type="tertiary"
        >
          {loggedIn ? "Logout" : "Login"}
        </Link>
      </Box>
    </Box>
  );
}
