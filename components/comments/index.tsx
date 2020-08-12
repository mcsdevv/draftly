// * Libraries
import { useState } from "react";
import { useRouter } from "next/router";

// * Helpers
import fetcher from "@lib/client/fetcher";

// * Hooks
import useScope from "@hooks/use-scope";
import useTweets from "@hooks/use-tweets";

// * Modulz
import { Button, Divider, Flex, Heading, Input } from "@modulz/radix";

// * Components
import Comment from "./comment";

export default function Comments() {
  const [comment, setComment] = useState("");
  const { scope } = useScope();
  const { drafts, published, setTweets } = useTweets();
  const router = useRouter();

  // * Get twuid from route query
  const { twuid } = router.query;

  // * Get tweet from list of tweets using twuid
  const tweet = drafts?.find((d: any) => d.twuid === twuid);

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
    const res = await fetcher(url, {
      method: "DELETE",
      body: JSON.stringify({
        tcuid,
      }),
    });
    if (res.status === 200) {
      const newDrafts = drafts.map((r: any) => {
        if (r.twuid === twuid) {
          return {
            ...r,
            comments: r.comments.filter((c: any) => c.tcuid !== tcuid),
          };
        }
        return r;
      });
      setTweets({
        drafts: newDrafts,
        published,
      });
    }
  };

  // * Add a comment
  const handleSubmitComment = async () => {
    const url = "/api/tweet/comment/create";
    const res = await fetcher(url, {
      method: "POST",
      body: JSON.stringify({ comment, twuid }),
    });
    setComment("");
    if (res.status === 200) {
      const publishedComment = res.data;
      console.log("PUBLISHED", publishedComment);
      console.log("COMMENTS", drafts[0].comments);
      const newDrafts = drafts.map((r: any) => {
        if (r.twuid === twuid) {
          return { ...r, comments: [publishedComment, ...r.comments] };
        }
        return r;
      });
      console.log("NEW COMMENTS", newDrafts[0].comments);
      // setTweets({
      //   drafts: newDrafts,
      //   published,
      // });
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
