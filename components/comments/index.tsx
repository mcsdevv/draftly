import { useState } from "react";

import useScope from "@hooks/use-scope";
import useTweets from "@hooks/use-tweets";

import Comment from "./comment";
import Input from "../input";

import styles from "./comments.module.css";

interface CommentsProps {
  comments: any;
  twuid: string;
}

export default function Comments({ comments, twuid }: CommentsProps) {
  const [comment, setComment] = useState("");
  const [scope] = useScope();
  const { drafts, published, reviews, setTweets } = useTweets();
  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newComment = e.currentTarget.value;
    setComment(newComment);
  };
  const handleDeleteComment = async (tcuid: string) => {
    const url = "/api/tweet/comment/delete";
    const res = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify({
        tcuid,
      }),
    });
    if (res.status === 200) {
      const newReviews = reviews.map((r: any) => {
        if (r.twuid === twuid) {
          return {
            ...r,
            comments: r.comments.filter((c: any) => c.tcuid !== tcuid),
          };
        }
        return r;
      });
      setTweets({
        drafts,
        published,
        reviews: newReviews,
      });
    }
  };
  const handleSubmitComment = async () => {
    const commentObject = {
      comment,
      twuid,
    };
    const url = "/api/tweet/comment/create";
    setComment("");
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ comment: commentObject, twuid }),
    });
    if (res.status === 200) {
      const publishedComment = await res.json();
      const newReviews = reviews.map((r: any) => {
        if (r.twuid === twuid) {
          return { ...r, comments: [publishedComment, ...r.comments] };
        }
        return r;
      });
      setTweets({
        drafts,
        published,
        reviews: newReviews,
      });
    }
  };
  const getAddedByProperty = (uid: string, property: string) => {
    const members = [...scope.members, ...scope.owners];
    const commenter = members.find((m) => m.uid === uid);
    return commenter[property];
  };
  return (
    <div className={styles.container}>
      <div className={styles.addComment}>
        <Input
          buttonDisabled={comment === ""}
          buttonText="Comment"
          label="Add Comment"
          onChange={handleOnChange}
          onSubmit={handleSubmitComment}
          type="text"
          value={comment}
        />
      </div>
      <div>
        {comments?.map((c: any) => (
          <Comment
            addedAt={c.added_at}
            addedBy={getAddedByProperty(c.added_by, "name")}
            avatar={getAddedByProperty(c.added_by, "picture")}
            comment={c.comment}
            handleDeleteComment={() => handleDeleteComment(c.tcuid)}
            key={c.tcuid}
          />
        ))}
      </div>
    </div>
  );
}
