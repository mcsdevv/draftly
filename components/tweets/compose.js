import { useContext, useState } from "react";
import ScopeContext from "../../context/scopeContext";
import Cookies from "js-cookie";
import parseJwt from "../../lib/parseJwt";

export default function ComposeTweet({ revalidate, setDrafting }) {
  const [tweet, setTweet] = useState();
  const [saving, setSaving] = useState(false);
  const { scope } = useContext(ScopeContext);
  const handleSaveDraft = async () => {
    setSaving(true);
    const id = Cookies.get("id_token");
    const { name } = parseJwt(id);
    const url = `/api/tweet/draft/create/${scope.handle}`;
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        creator: name,
        tweet
      })
    });
    if (res.status === 200) {
      setDrafting(false);
      setSaving(false);
      setTweet("");
      revalidate();
    }
  };
  const handleOnChange = e => {
    setTweet(e.target.value);
  };
  return !saving ? (
    <>
      <textarea
        placeholder="Draft your tweet..."
        onChange={handleOnChange}
        value={tweet}
      />
      <button onClick={handleSaveDraft}>Save Draft</button>
    </>
  ) : (
    <h2>Saving Draft...</h2>
  );
}
