// * Libraries
import React, { useState } from "react";
import { useRouter } from "next/router";

// * Hooks
import useScope from "@hooks/use-scope";
import useTweet from "@hooks/use-tweet";

// * Modulz
import { Button, Divider, Flex, Heading, Input } from "@modulz/radix";

// * Components
import Comment from "./comment";

export default function Comments() {
  const [comment, setComment] = useState("");
  const { scope } = useScope();
  const router = useRouter();

  // * Get twuid from route query
  const { twuid } = router.query;

  // * Get tweet from twuid
  const { setTweet, tweet } = useTweet(twuid?.toString());

  // * Get comments from tweet
  const comments = tweet?.comments;

  // * Update stored comment before saving
  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newComment = e.currentTarget.value;
    setComment(newComment);
  };

  // * Delete a comment
  const handleDeleteComment = async (tcuid: string) => {
    const url = "/api/tweet/comment/delete";
    const res = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify({
        tcuid,
      }),
    });
    if (res.status === 200) {
      setTweet({
        tweet: {
          ...tweet,
          comments: comments.filter((c: any) => c.tcuid !== tcuid),
        },
      });
    }
  };

  // * Add a comment
  const handleSubmitComment = async () => {
    const url = "/api/tweet/comment/create";
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ comment, twuid }),
    });
    setComment("");
    if (res.status === 200) {
      const publishedComment = await res.json();
      setTweet({
        tweet: { ...tweet, comments: [publishedComment, ...tweet.comments] },
      });
    }
  };

  // TODO Add to @lib
  const getAddedByProperty = (uid: string, property: string) => {
    const members = [...scope.members, ...scope.owners];
    const commenter = members.find((m) => m.uid === uid);
    return commenter[property];
  };

  return (
    <Flex
      sx={{
        flexDirection: "column",
        marginLeft: "16px",
        maxHeight: "700px",
        overflow: "scroll",
        padding: "0 8px",
        width: "100%",
      }}
    >
      <Heading as="h2" size={4}>
        Comments
      </Heading>
      <Divider mb={2} />
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
      <Flex sx={{ marginTop: "auto" }} mt={4}>
        <Input onChange={handleOnChange} size={1} value={comment} />
        <Button
          sx={{ cursor: "pointer" }}
          disabled={comment === ""}
          ml={2}
          onClick={handleSubmitComment}
          size={1}
          variant="blue"
        >
          Submit
        </Button>
      </Flex>
    </Flex>
  );
}
