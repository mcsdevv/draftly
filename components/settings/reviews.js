import { useState } from "react";

import useScope from "@hooks/use-scope";
import useUser from "@hooks/use-user";

import Input from "../input";

export default function Reviews() {
  const { revalidateProfile } = useUser();
  const [scope, setScope] = useScope();
  const [reviews, setReviews] = useState(scope?.reviews_required.toString());
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
