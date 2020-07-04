// * Libraries
import { useState } from "react";

// * Hooks
import useScope from "@hooks/use-scope";

// * Modulz
import { Input } from "@modulz/radix";

export default function Reviews() {
  const { scope, setScope } = useScope();
  const [reviews, setReviews] = useState(scope?.reviews_required.toString());
  const handleOnChange = (e) => {
    setReviews(e.target.value);
  };
  const handleOnSubmitReviews = async (e) => {
    e.preventDefault();
    const url = "/api/team/update/reviews";
    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        reviews,
      }),
    });
    if (res.status === 200) {
      setScope({ ...scope, reviews_required: reviews });
    }
  };
  return (
    <Input
      buttonDisabled={reviews === scope?.reviews_required.toString()}
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
