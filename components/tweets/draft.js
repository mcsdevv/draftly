import { useContext, useState } from "react";
import ScopeContext from "../../context/scopeContext";
import { mutate } from "swr";

import getMeta from "../../lib/getMeta";

import DefaultButton from "../buttons/default";
import SummaryLarge from "./cards/summary-large";
import Summary from "./cards/summary";
import Text from "./cards/text";

export default function Draft({ drafts, revalidate, size, tweet }) {
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editTweet, setEditTweet] = useState(tweet.text);
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
      mutate(`/api/tweets/details/drafts/${scope.handle}`, {
        drafts: drafts.filter(d => d.ref !== tweet.ref)
      });
      setDeleting(false);
    }
  };
  const handleEditDraft = () => {
    setEditing(true);
  };
  const handleOnChange = e => {
    // TODO Improve character limit handling
    if (editTweet.length < 280) {
      setEditTweet(e.target.value);
    } else {
      alert("over the limit bud");
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
      revalidate();
    }
  };
  const handleUpdateDraft = async () => {
    setEditing(false);
    setSaving(true);
    console.log(editTweet);
    const metadata = await getMeta(editTweet);
    const url = `/api/tweet/draft/update/${tweet.ref}`;
    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        metadata,
        text: editTweet
      })
    });
    if (res.status === 200) {
      const newDraft = await res.json();
      mutate(`/api/tweets/details/drafts/${scope.handle}`, {
        drafts: drafts.map(d => (d.ref === tweet.ref ? { ...newDraft } : d))
      });
      setSaving(false);
    }
  };
  const renderCardType = ({ metadata, text }) => {
    if (metadata.cardType === "summary-large") {
      return (
        <SummaryLarge
          editing={editing}
          editTweet={editTweet}
          handleOnChange={handleOnChange}
          meta={metadata}
          scope={scope}
          text={text}
        />
      );
    }
    if (metadata.cardType === "summary") {
      return (
        <Summary
          editing={editing}
          editTweet={editTweet}
          handleOnChange={handleOnChange}
          meta={metadata}
          scope={scope}
          text={text}
        />
      );
    }
    if (metadata.cardType === "text") {
      return (
        <Text
          editing={editing}
          editTweet={editTweet}
          handleOnChange={handleOnChange}
          scope={scope}
          text={text}
        />
      );
    }
  };
  // TODO Account for multiple Twitter card types - https://www.oncrawl.com/oncrawl-seo-thoughts/a-complete-guide-to-twitter-cards/
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
