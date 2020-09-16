// * Libraries
import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// * Modulz
import { Box, Container, Flex, Text } from "@modulz/radix";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <Container size={1} mt={4}>
      <Flex mb={4}>
        <Tab name="Account" />
        <Tab name="Team" />
        <Tab name="Members" />
        <Tab name="Plan" />
      </Flex>
      {children}
    </Container>
  );
}

export default SettingsLayout;

interface TabProps {
  name: string;
}

function Tab({ name }: TabProps) {
  const router = useRouter();

  const handle = router?.query?.handle;
  const nameLower = useMemo(() => name.toLowerCase(), [name]);

  // * Determine whether the tab is currently selected
  const selected = router.pathname.includes(nameLower);
  return (
    <Link
      as={`/${handle}/settings/${nameLower}`}
      href={`/[handle]/settings/${nameLower}`}
    >
      <a style={{ textDecoration: "none" }}>
        <Box
          sx={{
            borderBottom: !selected
              ? "2px hsl(210, 15%, 90%) solid"
              : "2px black solid",
            height: "40px",
            textAlign: "center",
            width: "80px",
          }}
        >
          <Text weight="medium">{name}</Text>
        </Box>
      </a>
    </Link>
  );
}
