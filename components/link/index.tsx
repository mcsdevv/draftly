import NextLink from "next/link";
import { Button } from "@modulz/radix";

interface LinkProps {
  as?: string;
  children: React.ReactNode;
  href: string;
  onClick?: () => void;
  type?: string;
  width?: string;
}

const Link = ({
  as,
  children,
  href,
  onClick,
  type = "button",
  width,
}: LinkProps) => {
  return (
    <NextLink as={as || href} href={href}>
      <a style={{ textDecoration: "none" }}>
        {type === "button" ? (
          <Button
            sx={{ cursor: "pointer", width: width || "96px" }}
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
