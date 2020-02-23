import { useEffect, useState } from "react";
import { useScope, useProfile } from "../../hooks";

import Form from "../form";
import Input from "../input";

export default function Reviews() {
  const { revalidateProfile, teams, user } = useProfile();
  const { scope, setScope } = useScope();
  const [reviews, setReviews] = useState({
    reviewsRequired: 0,
    updateReviewsRequired: 0
  });
  useEffect(() => {
    function getReviews() {
      if (scope && teams) {
        setReviews({
          reviewsRequired: scope.reviewsRequired.toString(),
          updateReviewsRequired: scope.reviewsRequired.toString()
        });
      }
    }
    getReviews();
  }, [scope, teams, user]);
  const handleOnChange = e => {
    const key = e.target.name;
    setReviews({ ...reviews, [key]: e.target.value });
  };
  const handleOnSubmitReviews = async e => {
    e.preventDefault();
    const url = `/api/team/update/reviews/${scope.handle}`;
    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        reviews: reviews.updateReviewsRequired
      })
    });
    if (res.status === 200) {
      revalidateProfile();
      const newScope = await res.json();
      setScope({ ...newScope, personal: false });
    }
  };
  return (
    <>
      <Form
        onSubmit={handleOnSubmitReviews}
        disabled={reviews.reviewsRequired === reviews.updateReviewsRequired}
      >
        <Input
          label="Reviews Required to Publish"
          max={3}
          min={0}
          name="updateReviewsRequired"
          onChange={handleOnChange}
          type="number"
          value={reviews.updateReviewsRequired}
        />
      </Form>
    </>
  );
}
