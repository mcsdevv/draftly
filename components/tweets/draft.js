import { useContext, useState } from "react";
import ScopeContext from "../../context/scopeContext";
import { mutate } from "swr";

import getMeta from "../../lib/getMeta";
import removeWww from "../../lib/removeWww";

import Button from "../button";
import Controls from "../controls";
import Tweet from "../tweet";

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
  const handleCancelEdit = () => {
    setEditing(false);
  };
  const handleDelete = async () => {
    setDeleting(true);
    const url = `/api/tweet/draft/delete/${scope.handle}`;
    const res = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify({
        ref: tweet.ref,
      }),
    });
    if (res.status === 200) {
      mutate(`/api/tweets/details/drafts/${scope.handle}`, {
        drafts: drafts.filter((d) => d.ref !== tweet.ref),
      });
      setDeleting(false);
    }
  };
  const handleEdit = () => {
    setEditing(true);
  };
  const handleOnChange = (e) => {
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
        tweet: tweet.text,
      }),
    });
    if (res.status === 200) {
      // TODO Mutate
      revalidate();
    }
  };
  const handleUpdate = async () => {
    // * No changes made, no need to update
    if (tweet.text === editTweet) {
      setEditing(false);
      return;
    }
    // * Changes made, update tweet
    setEditing(false);
    setSaving(true);
    const metadata = await getMeta(editTweet);
    const url = `/api/tweet/draft/update/${tweet.ref}`;
    const formattedTweet = removeWww(editTweet);
    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        metadata,
        text: formattedTweet,
      }),
    });
    if (res.status === 200) {
      const newDraft = await res.json();
      mutate(`/api/tweets/details/drafts/${scope.handle}`, {
        drafts: drafts.map((d) => (d.ref === tweet.ref ? { ...newDraft } : d)),
      });
      setSaving(false);
    }
  };
  // TODO Account for multiple Twitter card types - https://www.oncrawl.com/oncrawl-seo-thoughts/a-complete-guide-to-twitter-cards/
  return (
    <Tweet
      editing={editing}
      editTweet={editTweet}
      handleOnChange={handleOnChange}
      metadata={tweet.metadata}
      scope={scope}
      text={tweet.text}
    >
      <Controls
        editing={editing}
        handleCancelEdit={handleCancelEdit}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleUpdate={handleUpdate}
        handleReviewReady={handleReviewReady}
        type="draft"
      />
    </Tweet>
  );
}
