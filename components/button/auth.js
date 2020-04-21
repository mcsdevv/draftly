import { Button } from "@chakra-ui/core";

import Link from "next/link";
import Cookies from "js-cookie";

export default ({ loggedIn, logout, next }) => {
  const setNext = () => {
    Cookies.set("next", next);
  };
  return !loggedIn ? (
    <Link href={`/api/auth/login`}>
      <Button mx="2" onClick={setNext} variantColor="green">
        Login
      </Button>
    </Link>
  ) : (
    <Button mx="2" onClick={logout} variantColor="green">
      Logout
    </Button>
  );
};
