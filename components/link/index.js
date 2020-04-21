import cn from "classnames";
import NextLink from "next/link";
import styles from "./link.module.css";

const Link = ({ as, disabled, children, href, onClick, type = "primary" }) => (
  <NextLink as={as || href} href={href}>
    <a
      className={cn(styles.link, {
        [styles.primary]: type === "primary",
        [styles.secondary]: type === "secondary",
        [styles.tertiary]: type === "tertiary",
      })}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </a>
  </NextLink>
);

export default Link;
