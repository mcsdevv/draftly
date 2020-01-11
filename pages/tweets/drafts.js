import { useContext, useState } from "react";
import ScopeContext from "../../context/scopeContext";
import { useProfile } from "../../hooks";

import TweetsTabs from "../../components/tabs/tweets";
import ComposeTweet from "../../components/tweets/compose";

import RequireLogin from "../../lib/requireLogin";

function Drafts() {
  const [drafting, setDrafting] = useState(false);
  const { user } = useProfile();
  const { scope } = useContext(ScopeContext);
  const startDraft = () => {
    setDrafting(true);
  };
  const getPreview = async () => {
    const res = await fetch("/api/preview", {
      method: "POST",
      body: JSON.stringify({
        url: "https://zeit.co"
      })
    });
    const json = await res.json();
    console.log(json);
  };
  return (
    <>
      <TweetsTabs />
      <h1 onClick={getPreview}>Drafts</h1>
      <button onClick={startDraft}>Create Draft</button>
      {drafting && <ComposeTweet />}
      <h2>Current Drafts:</h2>
      <style jsx>{``}</style>
    </>
  );
}

export default () => RequireLogin(Drafts);
