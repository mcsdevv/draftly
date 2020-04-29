import { useContext, useState } from "react";
import ScopeContext from "../../context/scopeContext";
import { mutate } from "swr";

import getMeta from "../../lib/getMeta";
import removeWww from "../../lib/removeWww";

import { Box, Image } from "@chakra-ui/core";
import Button from "../button";
import Card from "../card";

export default function Draft({ drafts, revalidate, size, tweet }) {
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editTweet, setEditTweet] = useState(tweet.text);
  const [reviewing, setReviewing] = useState(false);
  const [saving, setSaving] = useState(false);
  const { scope } = useContext(ScopeContext);
  const getStateMessage = () => {
    if (deleting) return <h2>Deleting draft...</h2>;
    if (saving) return <h2>Saving draft...</h2>;
  };
  const handleCancelEdit = () => {
    setEditing(false);
  };
  const handleDeleteDraft = async () => {
    setDeleting(true);
    const url = `/api/tweet/draft/delete/${scope.handle}`;
    const res = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify({
        ref: tweet.ref,
      }),
    });
    if (res.status === 200) {
      mutate(`/api/tweets/details/drafts/${scope.handle}`, {
        drafts: drafts.filter((d) => d.ref !== tweet.ref),
      });
      setDeleting(false);
    }
  };
  const handleEditDraft = () => {
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
  const handleReviewReady = async () => {
    setReviewing(true);
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
  const handleUpdateDraft = async () => {
    // * No changes made, no need to update
    if (tweet.text === editTweet) {
      setEditing(false);
      return;
    }
    // * Changes made, update tweet
    setEditing(false);
    setSaving(true);
    console.log(editTweet);
    const metadata = await getMeta(editTweet);
    const url = `/api/tweet/draft/update/${tweet.ref}`;
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
      mutate(`/api/tweets/details/drafts/${scope.handle}`, {
        drafts: drafts.map((d) => (d.ref === tweet.ref ? { ...newDraft } : d)),
      });
      setSaving(false);
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
                src={scope.avatar}
                borderRadius="50%"
                marginRight="2px"
                maxW="49px"
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
                  onClick={handleDeleteDraft}
                  margin={false}
                  type="tertiary"
                >
                  Delete
                </Button>
                <Button onClick={handleEditDraft} type="secondary">
                  Edit
                </Button>
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
                <Button onClick={handleUpdateDraft} type="secondary">
                  Update
                </Button>
              </>
            )}
            {!editing && (
              <Button onClick={handleReviewReady} type="primary">
                Review
              </Button>
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
