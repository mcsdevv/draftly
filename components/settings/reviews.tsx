// * Libraries
import { useState } from "react";

// * Hooks
import useScope from "@hooks/use-scope";

// * Modulz
import {
  Button,
  Container,
  Flex,
  Input,
  Subheading,
  Text,
} from "@modulz/radix";

export default function Reviews() {
  const { scope, setScope } = useScope();
  const [reviews, setReviews] = useState(scope?.reviewsRequired?.toString());
  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setReviews(e.currentTarget.value);
  };
  const handleOnSubmitReviews = async () => {
    const url = "/api/team/update/reviews";
    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        reviews,
      }),
    });
    if (res.status === 200) {
      setScope({ ...scope, reviewsRequired: reviews });
    }
  };
  return (
    <Container mb={4} size={1}>
      <Subheading mb={2}>Reviews Required</Subheading>
      <Flex mb={2}>
        <Input
          max={3}
          min={0}
          name="updateReviewsRequired"
          onChange={handleOnChange}
          size={1}
          type="number"
          value={reviews}
        />
        <Button
          sx={{ cursor: "pointer", width: 100 }}
          disabled={reviews === scope?.reviewsRequired?.toString()}
          ml={2}
          onClick={handleOnSubmitReviews}
          size={1}
          variant="blue"
        >
          Submit
        </Button>
      </Flex>
      <Text sx={{ color: "gray600" }}>
        Enter the number of reviews required published a tweet.
      </Text>
    </Container>
  );
}
