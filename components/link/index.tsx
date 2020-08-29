// * Libraries
import NextLink from "next/link";

// * Modulz
import { Button } from "@modulz/radix";

interface LinkProps {
  as?: string;
  children: React.ReactNode;
  href: string;
  noMargin?: boolean;
  onClick?: () => void;
  sx: any;
  type?: string;
  width?: string;
}

const Link = ({
  as,
  children,
  href,
  noMargin,
  onClick,
  sx,
  type = "button",
  width,
}: LinkProps) => {
  return (
    <NextLink as={as || href} href={href}>
      <a style={{ textDecoration: "none" }}>
        {type === "button" ? (
          <Button
            sx={{ ...sx, cursor: "pointer", width: width || "96px" }}
            onClick={onClick}
            ml={!noMargin ? 4 : 0}
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
