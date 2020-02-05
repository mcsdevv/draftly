import { useContext, useState } from "react";
import { useRouter } from "next/router";
import ScopeContext from "../../../context/scopeContext";
import { useProfile } from "../../../hooks";

import TweetsTabs from "../../../components/tabs/tweets";

import RequireLogin from "../../../lib/requireLogin";

function Review() {
  const router = useRouter();
  console.log(router.query.ref);
  return (
    <>
      <TweetsTabs />
      <h1>Published</h1>
      <style jsx>{``}</style>
    </>
  );
}

export default () => RequireLogin(Review);
