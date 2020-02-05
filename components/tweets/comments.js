import { useContext, useState } from "react";
import ScopeContext from "../../context/scopeContext";
import { useProfile } from "../../hooks";
import { mutate } from "swr";
import { Check, Send, Trash2, Type } from "react-feather";
import uuidv4 from "uuid/v4";

export default function Comments({ comments, reviews, tweetRef }) {
  const [comment, setComment] = useState("");
  const { scope } = useContext(ScopeContext);
  const { user } = useProfile();
  const handleOnChange = e => {
    const newComment = e.target.value;
    setComment(newComment);
  };
  const handleDeleteComment = async id => {
    const url = `/api/tweet/comment/delete/${tweetRef}`;
    const res = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify({
        id
      })
    });
    const commentJson = await res.json();
    if (res.status === 200) {
      const newReviews = reviews.map(r => {
        if (r.ref === tweetRef) {
          return { ...r, comments: commentJson };
        }
        return r;
      });
      mutate(`/api/tweets/details/reviews/${scope.handle}`, {
        reviews: newReviews
      });
    }
  };
  const handleSubmitComment = async () => {
    const commentObject = {
      comment,
      addedBy: user.name,
      avatar: user.picture,
      id: uuidv4()
    };
    const url = `/api/tweet/comment/create/${tweetRef}`;
    setComment("");
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        ...commentObject
      })
    });
    const commentJson = await res.json();
    if (res.status === 200) {
      const newReviews = reviews.map(r => {
        if (r.ref === tweetRef) {
          return { ...r, comments: commentJson };
        }
        return r;
      });
      mutate(`/api/tweets/details/reviews/${scope.handle}`, {
        reviews: newReviews
      });
    }
  };
  return (
    <>
      <div className="comments-wrapper">
        <div className="comments">
          {comments.length ? (
            comments.map(c => (
              <div className="comment" key={c.id}>
                {c.comment} {c.addedBy}{" "}
                <div className="avatar">
                  <img src={c.avatar} />
                </div>
                <button onClick={() => handleDeleteComment(c.id)}>
                  <Trash2 />
                </button>
              </div>
            ))
          ) : (
            <h2>No comments!</h2>
          )}
        </div>
        <div className="add-comment">
          <input onChange={handleOnChange} value={comment} />
          <button onClick={handleSubmitComment}>
            <Send />
          </button>
        </div>
      </div>
      <style jsx>{`
        .comments-wrapper {
          max-height: 500px;
          overflow: scroll;
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
        .add-comment {
        }
      `}</style>
    </>
  );
}
