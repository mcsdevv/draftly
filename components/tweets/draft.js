import { useContext, useState } from "react";
import ScopeContext from "../../context/scopeContext";

export default function Draft({ revalidate, tweet }) {
  const [deleting, setDeleting] = useState();
  const { scope } = useContext(ScopeContext);
  const handleDeleteDraft = async () => {
    setDeleting(true);
    const url = `/api/tweet/draft/delete/${scope.handle}`;
    const res = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify({
        ref: tweet.ref
      })
    });
    if (res.status === 200) {
      setDeleting(false);
      revalidate();
    }
  };
  return !deleting ? (
    <>
      <h2>{tweet.text}</h2>
      <button onClick={handleDeleteDraft}>Delete Draft</button>
    </>
  ) : (
    <h2>Deleting Draft...</h2>
  );
}
