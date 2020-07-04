import NextLink from "next/link";
import { Button } from "@modulz/radix";
import styles from "./link.module.css";

interface LinkProps {
  as?: string;
  children: React.ReactNode;
  href: string;
  onClick?: () => void;
  type?: string;
}

const Link = ({ as, children, href, onClick, type = "button" }: LinkProps) => {
  return (
    <NextLink as={as || href} href={href}>
      <a className={styles.link}>
        {type === "button" ? (
          <Button
            sx={{ cursor: "pointer", width: "96px" }}
            onClick={onClick}
            ml={4}
            size={0}
          >
            {children}
          </Button>
        ) : (
          children
        )}
      </a>
    </NextLink>
  );
};
export default Link;
