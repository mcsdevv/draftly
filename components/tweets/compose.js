import { useContext, useState } from "react";
import ScopeContext from "../../context/scopeContext";

export default function ComposeTweet() {
  const [tweet, setTweet] = useState();
  const [saving, setSaving] = useState(false);
  const { scope } = useContext(ScopeContext);
  const handleSaveDraft = async () => {
    setSaving(true);
    const url = `/api/tweet/draft/create/${scope.handle}`;
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        tweet
      })
    });
    if (res.status === 200) {
      revalidateProfile();
      const newScope = await res.json();
      setScope({ ...newScope, personal: scope.personal });
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
