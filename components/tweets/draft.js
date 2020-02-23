import { useContext, useState } from "react";
import ScopeContext from "../../context/scopeContext";
import { mutate } from "swr";
import { Edit, ThumbsUp, Trash2 } from "react-feather";

import getMeta from "../../lib/getMeta";

import { Box, Image, useToast } from "@chakra-ui/core";
import Card from "./cards";

export default function Draft({ drafts, revalidate, size, tweet }) {
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editTweet, setEditTweet] = useState(tweet.text);
  const [reviewing, setReviewing] = useState(false);
  const [saving, setSaving] = useState(false);
  const { scope } = useContext(ScopeContext);
  const toast = useToast();
  const getStateMessage = () => {
    if (deleting) return <h2>Deleting draft...</h2>;
    if (saving) return <h2>Saving draft...</h2>;
  };
  const handleDeleteDraft = async () => {
    setDeleting(true);
    const url = `/api/tweet/draft/delete/${scope.handle}`;
    const res = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify({
        ref: tweet.ref
      })
    });
    if (res.status === 200) {
      mutate(`/api/tweets/details/drafts/${scope.handle}`, {
        drafts: drafts.filter(d => d.ref !== tweet.ref)
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
  const handleEditDraft = () => {
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
  const handleReviewReady = async () => {
    setReviewing(true);
    const url = `/api/tweet/review/create/${scope.handle}`;
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
      toast({
        title: "Tweet sent for review.",
        status: "success",
        duration: 9000,
        isClosable: true
      });
    }
  };
  const handleUpdateDraft = async () => {
    setEditing(false);
    setSaving(true);
    console.log(editTweet);
    const metadata = await getMeta(editTweet);
    const url = `/api/tweet/draft/update/${tweet.ref}`;
    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        metadata,
        text: editTweet
      })
    });
    if (res.status === 200) {
      const newDraft = await res.json();
      mutate(`/api/tweets/details/drafts/${scope.handle}`, {
        drafts: drafts.map(d => (d.ref === tweet.ref ? { ...newDraft } : d))
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
  // TODO Account for multiple Twitter card types - https://www.oncrawl.com/oncrawl-seo-thoughts/a-complete-guide-to-twitter-cards/
  return (
    <Box
      as="section"
      display="flex"
      flexDirection="column"
      alignItems="center"
      maxW="598px"
    >
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
          <Box display="flex">
            <IconBox as={Trash2} onClick={handleDeleteDraft} />
            <IconBox
              as={Edit}
              onClick={!editing ? handleEditDraft : handleUpdateDraft}
            />
            <IconBox as={ThumbsUp} onClick={handleReviewReady} />
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

const IconBox = ({ as, disabled, onClick }) => (
  <Box
    as={as}
    cursor="pointer"
    disabled={disabled}
    onClick={onClick}
    m="4"
    strokeWidth="1px"
  />
);
