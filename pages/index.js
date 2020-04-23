import { Heading } from "@chakra-ui/core";
import Button from "../components/button";
import Link from "../components/link";
import Characters from "../components/characters";

import Page from "../components/page";

export default function Landing() {
  return (
    <Page>
      <Heading as="h2">Draft...</Heading>
      <Heading as="h2">Review...</Heading>
      <Heading as="h2">Publish...</Heading>
      <Button disabled>Drafts</Button>
      <Button type="tertiary">Published</Button>
      <Link href="test" type="secondary">
        Nice link
      </Link>
      <Characters progress={50} />
    </Page>
  );
}
