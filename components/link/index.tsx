import cn from "classnames";
import NextLink from "next/link";
import styles from "./link.module.css";

interface LinkProps {
  as?: string;
  children: React.ReactNode;
  href: string;
  onClick?: () => void;
  type?: string;
}

const Link = ({ as, children, href, onClick, type = "primary" }: LinkProps) => {
  return (
    <NextLink as={as || href} href={href}>
      <a
        className={cn(styles.link, {
          [styles.primary]: type === "primary",
          [styles.secondary]: type === "secondary",
          [styles.tertiary]: type === "tertiary",
        })}
        onClick={onClick}
      >
        {children}
      </a>
    </NextLink>
  );
};
export default Link;
