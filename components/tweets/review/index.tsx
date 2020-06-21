import { useEffect, useState } from "react";
import { mutate } from "swr";

import useScope from "@hooks/use-scope";
import useTweets from "@hooks/use-tweets";
import useUser from "@hooks/use-user";

import getMetadata from "@lib/client/getMetadata";
import removeWww from "@lib/client/removeWww";

import Controls from "../../controls";
import Tweet from "../../tweet";

interface ReviewProps {
  tweet: any;
}

const Review = ({ tweet }: ReviewProps) => {
  console.log(tweet);
  const [editing, setEditing] = useState(false);
  const [editTweet, setEditTweet] = useState(tweet.text);
  const [reviewsRequired, setReviewsRequired] = useState(0);
  const [scope] = useScope();
  const { drafts, published, reviews, setTweets } = useTweets();
  const { user } = useUser();
  useEffect(() => {
    function getReviewsRequired() {
      const required = scope.reviews_required - tweet.approvals.length;
      setReviewsRequired(required);
    }
    getReviewsRequired();
  }, [scope, tweet]);
  const handleApprove = async () => {
    const url = "/api/tweet/review/approve";
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        twuid: tweet.twuid,
      }),
    });
    if (res.status === 200) {
      const approval = await res.json();
      setTweets({
        drafts,
        published,
        reviews: reviews.map((r) =>
          r.twuid === tweet.twuid
            ? { ...r, approvals: [...r.approvals, approval] }
            : r
        ),
      });
    }
    if (res.status === 403) {
      // TODO User has alreday approved tweet
    }
  };
  const handleCancelEdit = () => {
    setEditing(false);
  };
  const handleDelete = async () => {
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
  const handleUpdate = async () => {
    // * No changes made, no need to update
    if (tweet.text === editTweet) {
      setEditing(false);
      return;
    }
    // * Changes made, update tweet
    setEditing(false);
    const metadata = await getMetadata(editTweet);
    const url = "/api/tweet/review/update";
    const formattedTweet = removeWww(editTweet);
    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        metadata,
        text: formattedTweet,
        twuid: tweet.twuid,
      }),
    });
    if (res.status === 200) {
      const meta = await res.json();
      setTweets({
        drafts,
        published,
        reviews: reviews.map((r) =>
          r.twuid === tweet.twuid
            ? { ...r, metadata: meta, text: formattedTweet }
            : r
        ),
      });
    }
  };
  const handlePublish = async () => {
    const url = "/api/tweet/published/create";
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        tweet: tweet.text,
      }),
    });
    if (res.status === 200) {
      const publishedTweet = reviews.find((r) => r.twuid === tweet.twuid);
      setTweets({
        drafts,
        published: [...published, publishedTweet],
        reviews: reviews.filter((r) => r.twuid !== tweet.twuid),
      });
    }
  };
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
        approvals={tweet.approvals.length}
        approvalsRequired={scope.reviews_required}
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
};

export default Review;
