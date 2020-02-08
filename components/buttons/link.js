import { Button } from "@chakra-ui/core";

import Link from "next/link";

export default ({ text, to }) => (
  <Link href={to}>
    <a>
      <Button>{text}</Button>
    </a>
  </Link>
);
