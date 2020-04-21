import { useRouter } from "next/router";

import { Button } from "@chakra-ui/core";

import Link from "next/link";

export default function LinkButton({ text, to }) {
  const router = useRouter();
  return (
    <Link href={to}>
      <a>
        <Button
          variant="outline"
          variantColor={router.pathname === to ? "red" : "teal"}
          mx="2"
        >
          {text}
        </Button>
      </a>
    </Link>
  );
}
