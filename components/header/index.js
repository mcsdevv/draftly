import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useProfile, useScope } from "../../hooks/";

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
    window.location = "/";
  };
  const [isLanding, setLandingState] = useState(true);
  useEffect(() => {
    function getLandingState() {
      setLandingState(router.pathname === "/");
    }
    getLandingState();
  }, [router.pathname]);
  return user !== undefined ? (
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
        {!isLanding && user && <ScopePicker />}
      </Box>
      <Box>
        {isLanding && <LinkButton text="Dashboard" to="/dashboard" />}
        {!isLanding && user && scope && !scope.personal && (
          <LinkButton text="Drafts" to="/tweets/drafts" />
        )}
        {!isLanding && user && scope && !scope.personal && (
          <LinkButton text="Reviews" to="/tweets/reviews" />
        )}
        {!isLanding && user && scope && !scope.personal && (
          <LinkButton text="Published" to="/tweets/published" />
        )}
        {!isLanding && user && (
          <LinkButton text="Settings" to="/settings/account" />
        )}
        <AuthButton loggedIn={!!user} logout={logoutUser} next="/dashboard" />
      </Box>
    </Box>
  ) : (
    <Box
      as="header"
      display="flex"
      h="72px"
      justifyContent="space-between"
      py="4"
    />
  );
}
