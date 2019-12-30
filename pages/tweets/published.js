import { useContext, useState } from "react";
import ScopeContext from "../../context/scopeContext";
import { useProfile } from "../../hooks";

import TweetsTabs from "../../components/tabs/tweets";

import RequireLogin from "../../lib/requireLogin";

function Published() {
  const { user } = useProfile();
  const { scope } = useContext(ScopeContext);
  return (
    <>
      <TweetsTabs />
      <h1>Published</h1>
      <style jsx>{``}</style>
    </>
  );
}

export default () => RequireLogin(Published);
