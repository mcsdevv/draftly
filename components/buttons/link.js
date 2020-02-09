import { Button } from "@chakra-ui/core";

import Link from "next/link";

export default ({ text, to }) => (
  <Link href={to}>
    <a>
      <Button mx="2">{text}</Button>
    </a>
  </Link>
);
