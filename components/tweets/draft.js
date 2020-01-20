import { useContext, useState } from "react";
import ScopeContext from "../../context/scopeContext";

import DefaultButton from "../buttons/default";
import SummaryLarge from "./cards/summary-large";
import Summary from "./cards/summary";
import Text from "./cards/text";

export default function Draft({ revalidate, size, tweet }) {
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [reviewing, setReviewing] = useState(false);
  const [saving, setSaving] = useState(false);
  const { scope } = useContext(ScopeContext);
  const getStateMessage = () => {
    if (deleting) return <h2>Deleting draft...</h2>;
    if (saving) return <h2>Saving draft...</h2>;
  };
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
      revalidate();
    }
  };
  const handleEditDraft = async () => {
    setEditing(true);
    // setDeleting(true);
    // const url = `/api/tweet/draft/delete/${scope.handle}`;
    // const res = await fetch(url, {
    //   method: "DELETE",
    //   body: JSON.stringify({
    //     ref: tweet.ref
    //   })
    // });
    // if (res.status === 200) {
    //   revalidate();
    // }
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
      revalidate();
    }
  };
  const handleUpdateDraft = async () => {
    setSaving(true);
    // setDeleting(true);
    // const url = `/api/tweet/draft/delete/${scope.handle}`;
    // const res = await fetch(url, {
    //   method: "DELETE",
    //   body: JSON.stringify({
    //     ref: tweet.ref
    //   })
    // });
    // if (res.status === 200) {
    //   revalidate();
    // }
  };
  const renderCardType = ({ metadata, text }) => {
    if (metadata.cardType === "summary-large") {
      return (
        <SummaryLarge
          editing={editing}
          meta={metadata}
          saving={saving}
          scope={scope}
          text={text}
        />
      );
    }
    if (metadata.cardType === "summary") {
      return (
        <Summary
          editing={editing}
          meta={metadata}
          saving={saving}
          scope={scope}
          text={text}
        />
      );
    }
    if (metadata.cardType === "text") {
      return (
        <Text editing={editing} saving={saving} scope={scope} text={text} />
      );
    }
  };
  // TODO Account for multiple Twitter card types - https://www.oncrawl.com/oncrawl-seo-thoughts/a-complete-guide-to-twitter-cards/
  console.log(tweet);
  return (
    <>
      <div className="draft-wrapper">
        {!deleting && !saving ? (
          <>
            <article className="draft">
              <div className="avatar">
                <img src={scope.avatar} />
              </div>
              {renderCardType(tweet)}
            </article>
            <div>
              <DefaultButton
                handleOnClick={handleDeleteDraft}
                text="Delete Draft"
              />
              <DefaultButton
                handleOnClick={!editing ? handleEditDraft : handleUpdateDraft}
                text={!editing ? "Edit Draft" : "Save Draft"}
              />
              <DefaultButton
                handleOnClick={handleReviewReady}
                loading={reviewing}
                text="Review Ready"
              />
            </div>
          </>
        ) : (
          <div className="updating">{getStateMessage()}</div>
        )}
      </div>
      <style jsx>{`
        .draft-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: ${size === "small" ? "400" : "600"}px;
        }
        .draft {
          border: 1px solid rgb(230, 236, 240);
          display: flex;
          padding 10px 15px;
          width: 100%;
        }
        .updating {
          align-items: center;
          display: flex;
          height: 500px;
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
      `}</style>
    </>
  );
}
