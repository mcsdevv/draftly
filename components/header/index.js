import { useProfile, useScope } from "../../hooks/";
import { useRouter } from "next/router";

import Cookies from "js-cookie";

import AuthButton from "../buttons/auth";
import LinkButton from "../buttons/link";
import ScopePicker from "../scope/picker";
import { Box, Heading } from "@chakra-ui/core";

export default function Header() {
  // TODO Move AuthButton into its own login page
  const { user } = useProfile();
  const { scope } = useScope();
  const router = useRouter();
  const logoutUser = () => {
    fetch("/api/auth/logout");
    Cookies.remove("id_token");
    Cookies.remove("access_token");
    Cookies.remove("next");
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
        <LinkButton text="Dashboard" to="/dashboard" />
        {user && scope && !scope.personal && (
          <>
            <LinkButton text="Drafts" to="/tweets/drafts" />
            <LinkButton text="Reviews" to="/tweets/reviews" />
            <LinkButton text="Published" to="/tweets/published" />
          </>
        )}
        {user && <LinkButton text="Settings" to="/settings" />}
        <AuthButton loggedIn={loggedIn} logout={logoutUser} next="/dashboard" />
      </Box>
    </Box>
  );
}
