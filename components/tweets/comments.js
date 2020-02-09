import { useContext, useState } from "react";
import ScopeContext from "../../context/scopeContext";
import { useProfile } from "../../hooks";
import { mutate } from "swr";
import uuidv4 from "uuid/v4";

import { Box, Heading } from "@chakra-ui/core";
import Comment from "./comment";
import Form from "../form";
import Input from "../input";

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
  const handleSubmitComment = async e => {
    e.preventDefault();
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
      <Box mh="500px" overflow="scroll">
        <Box>
          {comments.length ? (
            comments.map(c => (
              <Comment
                addedBy={c.addedBy}
                avatar={c.avatar}
                comment={c.comment}
                handleDeleteComment={() => handleDeleteComment(c.id)}
                key={c.id}
              />
            ))
          ) : (
            <Heading as="h2" size="lg">
              No comments!
            </Heading>
          )}
        </Box>
        <Box>
          <Form
            label="Add Comment"
            onSubmit={handleSubmitComment}
            handleOnChange={handleOnChange}
            value={comment}
          >
            <Input onChange={handleOnChange} value={comment} />
          </Form>
        </Box>
      </Box>
    </>
  );
}
