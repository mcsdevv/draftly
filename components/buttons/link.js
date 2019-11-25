import Link from "next/link";

export default ({ text, to }) => (
  <Link href={to}>
    <a>
      <button>{text}</button>
    </a>
  </Link>
);
