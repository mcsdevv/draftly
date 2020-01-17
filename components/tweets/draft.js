import { useContext, useState } from "react";
import ScopeContext from "../../context/scopeContext";

import DefaultButton from "../buttons/default";
import SummaryLarge from "./cards/summary-large";

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
  // TODO Account for multiple Twitter card types - https://www.oncrawl.com/oncrawl-seo-thoughts/a-complete-guide-to-twitter-cards/
  console.log(tweet);
  return (
    <>
      {!deleting ? (
        <article className="draft">
          <div className="avatar">
            <img src={scope.avatar} />
          </div>
          <SummaryLarge meta={tweet.metadata} text={tweet.text} />
        </article>
      ) : (
        <h2>Deleting Draft...</h2>
      )}
      <DefaultButton handleOnClick={handleDeleteDraft} text="Delete Draft" />
      <DefaultButton
        handleOnClick={handleReviewReady}
        loading={reviewing}
        text="Review Ready"
      />
      <style jsx>{`
        .draft {
          border: 1px solid rgb(230, 236, 240);
          display: flex;
          max-width: 600px;
          padding 10px 15px;
        }
        .avatar {
          height: 100%;
          margin-right: 5px;
        }
        img {
          border-radius: 50%;
          height: 49px;
          width: 49px;
        }
      `}</style>
    </>
  );
}
