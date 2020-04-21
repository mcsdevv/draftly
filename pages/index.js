import { Heading } from "@chakra-ui/core";
import Button from "../components/button";

import Page from "../components/page";

export default function Landing() {
  return (
    <Page>
      <Heading as="h2">Draft...</Heading>
      <Heading as="h2">Review...</Heading>
      <Heading as="h2">Publish...</Heading>
      <Button>Drafts</Button>
      <Button type="secondary">Reviews</Button>
      <Button type="tertiary">Published</Button>
    </Page>
  );
}
