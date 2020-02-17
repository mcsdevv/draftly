import { useContext, useState } from "react";
import ScopeContext from "../../context/scopeContext";
import { useProfile } from "../../hooks";
import { mutate } from "swr";
import { Check, Edit, Send, Trash2 } from "react-feather";

import getMeta from "../../lib/getMeta";

import { Box, Image, Text } from "@chakra-ui/core";
import Icon from "../icon";
import Card from "./cards";

export default function Review({ revalidate, reviews, size, tweet }) {
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editTweet, setEditTweet] = useState(tweet.text);
  const [reviewing, setReviewing] = useState(false);
  const [saving, setSaving] = useState(false);
  const { scope } = useContext(ScopeContext);
  const { user, teams } = useProfile();
  const getStateMessage = () => {
    if (deleting) return <h2>Deleting review...</h2>;
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
    setEditing(false);
    setSaving(true);
    console.log(editTweet);
    const metadata = await getMeta(editTweet);
    const url = `/api/tweet/review/update/${tweet.ref}`;
    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        metadata,
        text: editTweet
      })
    });
    if (res.status === 200) {
      const newDraft = await res.json();
      mutate(`/api/tweets/details/reviews/${scope.handle}`, {
        reviews: reviews.map(d => (d.ref === tweet.ref ? { ...newDraft } : d))
      });
      setSaving(false);
    }
  };
  const handlePublishTweet = () => {
    console.log("published");
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
            <Icon
              as={Trash2}
              onClick={handleDeleteReview}
              tooltip="Delete tweet."
            />
            <Icon
              as={Edit}
              onClick={!editing ? handleEditReview : handleUpdateReview}
              tooltip="Edit tweet."
            />
            <Text m="6">
              {tweet.approvedBy.length} / {scope.reviewsRequired}
            </Text>
            <Icon
              as={Check}
              disabled={user && user.name === tweet.creator}
              onClick={handleApproveTweet}
              tooltip="Approve tweet."
              tooltipDisabled="You cannot approve your own tweet."
            />
            <Icon
              as={Send}
              disabled={tweet.approvedBy.length !== scope.reviewsRequired}
              onClick={handlePublishTweet}
              tooltip="Publish tweet."
              tooltipDisabled="Reviews required."
            />
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
