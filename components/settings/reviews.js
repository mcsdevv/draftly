import { useState } from "react";
import { useScope, useUser } from "../../hooks";

import Input from "../input";

export default function Reviews() {
  const { revalidateProfile } = useUser();
  const { scope, setScope } = useScope();
  const [reviews, setReviews] = useState(scope?.reviewsRequired.toString());
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
    }
  };
  return (
    <Input
      buttonDisabled={reviews === scope?.reviewsRequired.toString()}
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
