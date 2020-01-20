import { useContext, useState } from "react";
import ScopeContext from "../../context/scopeContext";

import DefaultButton from "../buttons/default";
import SummaryLarge from "./cards/summary-large";
import getCardType from "../../lib/getCardType";

export default function Draft({ revalidate, size, tweet }) {
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
      <div className="draft-wrapper">
        {!deleting ? (
          <article className="draft">
            <div className="avatar">
              <img src={scope.avatar} />
            </div>
            {/* // TODO Add logic for rendering different card types */}
            <SummaryLarge
              meta={tweet.metadata}
              scope={scope}
              text={tweet.text}
            />
          </article>
        ) : (
          <h2>Deleting Draft...</h2>
        )}
        <div className="buttons">
          <DefaultButton
            handleOnClick={handleDeleteDraft}
            text="Delete Draft"
          />
          <DefaultButton
            handleOnClick={handleReviewReady}
            loading={reviewing}
            text="Review Ready"
          />
        </div>
      </div>
      <style jsx>{`
        .draft-wrapper {
          max-width: ${size === "small" ? "400" : "600"}px;
        }
        .draft {
          border: 1px solid rgb(230, 236, 240);
          display: flex;
          padding 10px 15px;
        }
        .avatar {
          height: 100%;
          margin-right: 5px;
        }
        .avatar img {
          border-radius: 50%;
          height: 49px;
          width: 49px;
        }
        img {
          margin-right: 2px;
          max-width: 50px;
        }
        .buttons {
          display: flex;
          justify-content: center;
        }
      `}</style>
    </>
  );
}
