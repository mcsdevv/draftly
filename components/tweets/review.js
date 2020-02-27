import { useContext, useEffect, useState } from "react";
import ScopeContext from "../../context/scopeContext";
import { useProfile } from "../../hooks";
import { mutate } from "swr";
import { Check, CheckCircle, Edit, Send, Trash2, X } from "react-feather";

import getMeta from "../../lib/getMeta";
import removeWww from "../../lib/removeWww";

import { Box, Image, Text, useToast } from "@chakra-ui/core";
import Icon from "../icon";
import Card from "./cards";

export default function Review({ revalidate, reviews, size, tweet }) {
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editTweet, setEditTweet] = useState(tweet.text);
  const [reviewsRequired, setReviewsRequired] = useState(false);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const { scope } = useContext(ScopeContext);
  const { user, teams } = useProfile();
  const toast = useToast();
  useEffect(() => {
    function getReviewsRequired() {
      const required = scope.reviewsRequired - tweet.approvedBy.length;
      setReviewsRequired(required);
    }
    getReviewsRequired();
  }, [scope, tweet]);
  const getStateMessage = () => {
    if (deleting) return <h2>Deleting review...</h2>;
    if (saving) return <h2>Saving draft...</h2>;
  };
  const handleApproveTweet = () => {
    console.log("approved");
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
        ref: tweet.ref
      })
    });
    if (res.status === 200) {
      mutate(`/api/tweets/details/reviews/${scope.handle}`, {
        reviews: reviews.filter(d => d.ref !== tweet.ref)
      });
      setDeleting(false);
      toast({
        title: "Tweet deleted.",
        status: "success",
        duration: 9000,
        isClosable: true
      });
    }
  };
  const handleEditReview = () => {
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
        text: formattedTweet
      })
    });
    if (res.status === 200) {
      const newDraft = await res.json();
      mutate(`/api/tweets/details/reviews/${scope.handle}`, {
        reviews: reviews.map(d => (d.ref === tweet.ref ? { ...newDraft } : d))
      });
      setSaving(false);
      toast({
        title: "Tweet updated.",
        status: "success",
        duration: 9000,
        isClosable: true
      });
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
        tweet: tweet.text
      })
    });
    if (res.status === 200) {
      revalidate();
      setPublishing(false);
      toast({
        title: "Tweet published.",
        status: "success",
        duration: 9000,
        isClosable: true
      });
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
                <Icon
                  as={Trash2}
                  onClick={handleDeleteReview}
                  tooltip="Delete tweet."
                />
                <Icon
                  as={Edit}
                  onClick={handleEditReview}
                  tooltip="Edit tweet."
                />
                <Text m="6">
                  {tweet.approvedBy.length} / {scope.reviewsRequired}
                </Text>
              </>
            ) : (
              <>
                <Icon
                  as={Check}
                  onClick={handleUpdateReview}
                  tooltip="Complete edit."
                />
                <Icon
                  as={X}
                  onClick={handleCancelEdit}
                  tooltip="Cancel edit."
                />
              </>
            )}
            {!editing && (
              <>
                <Icon
                  as={CheckCircle}
                  disabled={user && user.name === tweet.creator}
                  onClick={handleApproveTweet}
                  tooltip="Approve tweet."
                  tooltipDisabled="You cannot approve your own tweet."
                />
                <Icon
                  as={Send}
                  disabled={reviewsRequired !== 0}
                  onClick={handlePublishTweet}
                  tooltip="Publish tweet."
                  tooltipDisabled={`${reviewsRequired} Review${
                    reviewsRequired > 1 ? "s" : ""
                  } required.`}
                />
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
