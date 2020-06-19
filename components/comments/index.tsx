import { useState } from "react";
import { mutate } from "swr";
import uuidv4 from "uuid/v4";
import { useScope } from "../../hooks";
import styles from "./comments.module.css";
import Comment from "./comment";
import Input from "../input";

interface CommentsProps {
  comments: any;
  reviews: any;
  twuid: string;
}

export default function Comments({ comments, reviews, twuid }: CommentsProps) {
  const [comment, setComment] = useState("");
  const [scope] = useScope();
  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newComment = e.currentTarget.value;
    setComment(newComment);
  };
  const handleDeleteComment = async (id: string) => {
    const url = `/api/tweet/comment/delete/${twuid}`;
    const res = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify({
        id,
      }),
    });
    const commentJson = await res.json();
    if (res.status === 200) {
      const newReviews = reviews.map((r: any) => {
        if (r.ref === twuid) {
          return { ...r, comments: commentJson };
        }
        return r;
      });
      mutate(`/api/tweets/details/reviews/${scope.handle}`, {
        reviews: newReviews,
      });
    }
  };
  const handleSubmitComment = async () => {
    const commentObject = {
      comment,
      tcuid: uuidv4(),
      twuid,
    };
    const url = "/api/tweet/comment/create";
    setComment("");
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(commentObject),
    });
    const commentJson = await res.json();
    if (res.status === 200) {
      const newReviews = reviews.map((r: any) => {
        if (r.ref === twuid) {
          return { ...r, comments: commentJson };
        }
        return r;
      });
      mutate(`/api/tweets/details/reviews/${scope.handle}`, {
        reviews: newReviews,
      });
    }
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
        {comments.length
          ? comments.map((c: any) => (
              <Comment
                addedAt={c.addedAt}
                addedBy={c.addedBy}
                avatar={c.avatar}
                comment={c.comment}
                handleDeleteComment={() => handleDeleteComment(c.id)}
                key={c.id}
              />
            ))
          : null}
      </div>
    </div>
  );
}
