// * Libraries
import React, { useState } from "react";
import { useRouter } from "next/router";

// * Hooks
import useTweet from "@hooks/use-tweet";

// * Modulz
import { Button, Flex, Input, Text } from "@modulz/radix";

// * Components
import Comment from "./comment";

export default function Comments() {
  const [comment, setComment] = useState("");
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

  return (
    <Flex
      sx={{
        flexDirection: "column",
        height: "100%",
        overflow: "scroll",
      }}
    >
      {comments?.length > 0 ? (
        comments.map((c: any) => (
          <Comment
            addedAt={c.addedAt}
            addedBy={c.addedBy?.name}
            avatar={c.addedBy?.picture}
            comment={c.comment}
            handleDeleteComment={() => handleDeleteComment(c.tcuid)}
            key={c.tcuid}
          />
        ))
      ) : (
        <Flex
          sx={{
            alignItems: "center",
            height: "100%",
            justifyContent: "center",
          }}
        >
          <Text as="p" mb={4}>
            No comments present - why not add one?
          </Text>
        </Flex>
      )}
      <Flex sx={{ marginTop: "auto" }} mt={4}>
        <Input
          onChange={handleOnChange}
          size={1}
          mb="1px"
          ml="1px"
          value={comment}
        />
        <Button
          sx={{ cursor: "pointer", width: 100 }}
          disabled={comment === ""}
          mb="1px"
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
