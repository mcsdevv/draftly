import { useContext, useEffect, useState } from "react";
import ScopeContext from "../../context/scopeContext";
import { useProfile } from "../../hooks";
import { mutate } from "swr";

import getMeta from "../../lib/getMeta";
import removeWww from "../../lib/removeWww";

import Controls from "../controls";
import Tweet from "../tweet";

export default function Review({ revalidate, reviews, tweet }) {
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editTweet, setEditTweet] = useState(tweet.text);
  const [reviewsRequired, setReviewsRequired] = useState(false);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const { scope } = useContext(ScopeContext);
  const { user, teams } = useProfile();
  useEffect(() => {
    function getReviewsRequired() {
      const required = scope.reviewsRequired - tweet.approvedBy.length;
      setReviewsRequired(required);
    }
    getReviewsRequired();
  }, [scope, tweet]);
  const handleApprove = async () => {
    const url = `/api/tweet/review/approve/${tweet.ref}`;
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: user.email,
      }),
    });
    if (res.status === 200) {
      revalidate();
    }
  };
  const handleCancelEdit = () => {
    setEditing(false);
  };
  const handleDelete = async () => {
    setDeleting(true);
    const url = `/api/tweet/review/delete/${scope.handle}`;
    const res = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify({
        ref: tweet.ref,
      }),
    });
    if (res.status === 200) {
      mutate(`/api/tweets/details/reviews/${scope.handle}`, {
        reviews: reviews.filter((d) => d.ref !== tweet.ref),
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
    const url = `/api/tweet/review/update/${tweet.ref}`;
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
      mutate(`/api/tweets/details/reviews/${scope.handle}`, {
        reviews: reviews.map((d) =>
          d.ref === tweet.ref ? { ...newDraft } : d
        ),
      });
      setSaving(false);
    }
  };
  const handlePublish = async () => {
    setPublishing(true);
    const url = `/api/tweet/published/create/${scope.handle}`;
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        creator: tweet.creator,
        ref: tweet.ref,
        tweet: tweet.text,
      }),
    });
    if (res.status === 200) {
      revalidate();
      setPublishing(false);
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
        disableApprove={user?.name === tweet.creator}
        disablePublish={reviewsRequired !== 0}
        editing={editing}
        handleApprove={handleApprove}
        handleCancelEdit={handleCancelEdit}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handlePublish={handlePublish}
        handleUpdate={handleUpdate}
        type="review"
      />
    </Tweet>
  );
}
