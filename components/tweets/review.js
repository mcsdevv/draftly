import { useContext, useEffect, useState } from "react";
import ScopeContext from "../../context/scopeContext";
import { useProfile } from "../../hooks";
import { mutate } from "swr";

import getMeta from "../../lib/getMeta";
import removeWww from "../../lib/removeWww";

import { Box, Image, Text } from "@chakra-ui/core";
import Button from "../button";
import Card from "../card";

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
  console.log(user);
  const getStateMessage = () => {
    if (deleting) return <h2>Deleting review...</h2>;
    if (saving) return <h2>Saving draft...</h2>;
  };
  const handleApproveTweet = async () => {
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
  const handleDeleteReview = async () => {
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
  const handleEditReview = () => {
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
  const handleUpdateReview = async () => {
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
  const handlePublishTweet = async () => {
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
    <Box display="flex" flexDirection="column" alignItems="center" maxW="598px">
      {!deleting && !saving ? (
        <>
          <Box
            as="article"
            border="1px solid rgb(230, 236, 240)"
            display="flex"
            py="10px"
            px="15px"
            w="100%"
          >
            <Box h="100%" marginRight="5px">
              <Image
                borderRadius="50%"
                marginRight="2px"
                maxW="49px"
                src={scope.avatar}
                w="49px"
              />
            </Box>
            <Card
              editing={editing}
              editTweet={editTweet}
              handleOnChange={handleOnChange}
              metadata={tweet.metadata}
              scope={scope}
              text={tweet.text}
            />
          </Box>
          <Box alignContent="center" display="flex">
            {!editing ? (
              <>
                <Button
                  onClick={handleDeleteReview}
                  margin={false}
                  type="tertiary"
                >
                  Delete
                </Button>
                <Button onClick={handleEditReview} type="secondary">
                  Edit
                </Button>
                {scope.reviewsRequired > 0 && (
                  <Text m="6">
                    {tweet.approvedBy.length} / {scope.reviewsRequired}
                  </Text>
                )}
              </>
            ) : (
              <>
                <Button
                  onClick={handleCancelEdit}
                  margin={false}
                  type="tertiary"
                >
                  Cancel
                </Button>
                <Button onClick={handleUpdateReview} type="secondary">
                  Update
                </Button>
              </>
            )}
            {!editing && (
              <>
                <Button
                  disabled={user?.name === tweet.creator}
                  onClick={handleApproveTweet}
                  type="primary"
                >
                  Approve
                </Button>
                <Button
                  disabled={reviewsRequired !== 0}
                  onClick={handlePublishTweet}
                  type="primary"
                >
                  Publish
                </Button>
              </>
            )}
          </Box>
        </>
      ) : (
        <Box alignItems="center" display="flex" h="500px">
          {getStateMessage()}
        </Box>
      )}
    </Box>
  );
}
