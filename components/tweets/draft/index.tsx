import { useState } from "react";
import { mutate } from "swr";

import useScope from "@hooks/use-scope";

import getMeta from "@lib/client/getMeta";
import removeWww from "@lib/client/removeWww";

import Controls from "../../controls";
import Tweet from "../../tweet";

interface DraftProps {
  drafts: any[];
  revalidate: () => void;
  tweet: any;
}

const Draft = ({ drafts, revalidate, tweet }: DraftProps) => {
  const [editing, setEditing] = useState(false);
  const [editTweet, setEditTweet] = useState(tweet.text);
  const [scope] = useScope();
  const handleCancelEdit = () => {
    setEditing(false);
  };
  const handleDelete = async () => {
    const url = "/api/tweet/draft/delete";
    const res = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify({
        twuid: tweet.twuid,
      }),
    });
    if (res.status === 200) {
      mutate(`/api/tweets/details/drafts/${scope.handle}`, {
        drafts: drafts.filter((d) => d.ref !== tweet.ref),
      });
    }
  };
  const handleEdit = () => {
    setEditing(true);
  };
  const handleOnChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    // TODO Improve character limit handling
    if (editTweet.length < 280) {
      setEditTweet(e.currentTarget.value);
    } else {
      alert("over the limit bud");
    }
  };
  const handleReviewReady = async () => {
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
    const metadata = await getMeta(editTweet);
    const url = "/api/tweet/draft/update";
    const formattedTweet = removeWww(editTweet);
    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        metadata,
        text: formattedTweet,
        tuid: tweet.tuid,
        twuid: tweet.twuid,
      }),
    });
    if (res.status === 200) {
      const newDraft = await res.json();
      mutate(`/api/tweets/details/drafts/${scope.handle}`, {
        drafts: drafts.map((d) => (d.ref === tweet.ref ? { ...newDraft } : d)),
      });
    }
  };
  // TODO Account for multiple Twitter card types - https://www.oncrawl.com/oncrawl-seo-thoughts/a-complete-guide-to-twitter-cards/
  return (
    <Tweet
      editing={editing}
      editTweet={editTweet}
      handleOnChange={handleOnChange}
      metadata={tweet.meta}
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
};

export default Draft;
