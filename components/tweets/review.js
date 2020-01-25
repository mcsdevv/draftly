import { useContext, useState } from "react";
import ScopeContext from "../../context/scopeContext";
import { useProfile } from "../../hooks";
import { mutate } from "swr";
import { Edit, Send, ThumbsUp, Trash2 } from "react-feather";

import Card from "./cards";

export default function Review({ revalidate, reviews, size, tweet }) {
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editTweet, setEditTweet] = useState(tweet.text);
  const [reviewing, setReviewing] = useState(false);
  const [saving, setSaving] = useState(false);
  const { scope } = useContext(ScopeContext);
  const { user } = useProfile();
  const getStateMessage = () => {
    if (deleting) return <h2>Deleting draft...</h2>;
    if (saving) return <h2>Saving draft...</h2>;
  };
  const handleApproveTweet = () => {
    console.log("approved");
  };
  const handleDeleteReview = async () => {
    setDeleting(true);
    const url = `/api/tweet/review/delete/${scope.handle}`;
    const res = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify({
        ref: tweet.ref
      })
    });
    if (res.status === 200) {
      mutate(`/api/tweets/details/reviews/${scope.handle}`, {
        reviews: reviews.filter(d => d.ref !== tweet.ref)
      });
      setDeleting(false);
    }
  };
  const handlePublishTweet = () => {
    console.log("published");
  };
  const handleSuggestChange = () => {
    console.log("changes");
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
              <Card
                editing={editing}
                editTweet={editTweet}
                metadata={tweet.metadata}
                scope={scope}
                text={tweet.text}
              />
            </article>
            <div>
              <Trash2 onClick={handleDeleteReview} />
              <Edit onClick={handleSuggestChange} />
              <ThumbsUp onClick={handleApproveTweet} />
              <Send onClick={handlePublishTweet} />
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
