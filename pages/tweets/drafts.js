import { useContext, useState } from "react";
import ScopeContext from "../../context/scopeContext";
import { useProfile } from "../../hooks";

import TweetsTabs from "../../components/tabs/tweets";
import ComposeTweet from "../../components/tweets/compose";

import RequireLogin from "../../lib/requireLogin";

function Drafts() {
  const [draft, setDraft] = useState({ active: false, content: "" });
  const { user } = useProfile();
  const { scope } = useContext(ScopeContext);
  const startDraft = () => {
    setDraft({ ...draft, active: true });
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
      {draft.active && <ComposeTweet />}
      <h2>Current Drafts:</h2>
      <style jsx>{``}</style>
    </>
  );
}

export default () => RequireLogin(Drafts);
