import { useContext, useState } from "react";
import ScopeContext from "../../context/scopeContext";

import DefaultButton from "../buttons/default";

export default function Draft({ revalidate, tweet }) {
  const [deleting, setDeleting] = useState(false);
  const [reviewing, setReviewing] = useState(false);
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
  const handleReviewReady = async () => {
    // TODO Add API for create, use existing delete for drafts
    setReviewing(true);
    const url = `/api/tweet/review/create/${scope.handle}`;
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        creator: tweet.creator,
        ref: tweet.ref,
        tweet: tweet.text
      })
    });
    if (res.status === 200) {
      setReviewing(false);
      revalidate();
    }
  };
  return !deleting ? (
    <div className="draft">
      <h2>{tweet.text}</h2>
      <DefaultButton handleOnClick={handleDeleteDraft} text="Delete Draft" />
      <DefaultButton
        handleOnClick={handleReviewReady}
        loading={reviewing}
        text="Review Ready"
      />
    </div>
  ) : (
    <h2>Deleting Draft...</h2>
  );
}
