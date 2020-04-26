import { useState } from "react";
import { useScope, useProfile } from "../../hooks";

import { useToast } from "@chakra-ui/core";
import Input from "../input";

export default function Reviews() {
  const { revalidateProfile } = useProfile();
  const { scope, setScope } = useScope();
  const [reviews, setReviews] = useState(scope.reviewsRequired.toString());
  const toast = useToast();
  const handleOnChange = (e) => {
    setReviews(e.target.value);
  };
  const handleOnSubmitReviews = async (e) => {
    e.preventDefault();
    const url = `/api/team/update/reviews/${scope.handle}`;
    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        reviews,
      }),
    });
    if (res.status === 200) {
      revalidateProfile();
      const newScope = await res.json();
      setScope({ ...newScope });
      toast({
        title: "Required number of reviews updated.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  return (
    <Input
      buttonDisabled={reviews === scope.reviewsRequired.toString()}
      buttonText="Update"
      label="Reviews Required to Publish"
      max={3}
      min={0}
      name="updateReviewsRequired"
      onChange={handleOnChange}
      onSubmit={handleOnSubmitReviews}
      type="number"
      value={reviews}
    />
  );
}
