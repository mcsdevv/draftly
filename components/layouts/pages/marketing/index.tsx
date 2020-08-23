// * Libraries
import { useEffect, useState } from "react";

// * Modulz
import { Container, Divider, Flex, Heading } from "@modulz/radix";

// * Components
import Header from "@components/header/marketing";

interface MarketingLayoutProps {
  children: React.ReactNode;
  name?: string;
}

const MarketingLayout = ({ children, name }: MarketingLayoutProps) => {
  const [loaded, setLoaded] = useState(false);

  // * Confirm page loaded before render to prevent layout shift
  useEffect(() => {
    function getLoaded() {
      setLoaded(true);
    }
    getLoaded();
  }, []);

  return loaded ? (
    <Container
      sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      size={3}
    >
      <Header />
      <Flex sx={{ justifyContent: "space-between" }}>
        <Heading size={5} weight="medium">
          {name}
        </Heading>
      </Flex>
      <Divider mb={4} />
      <Flex sx={{ flexGrow: 1 }}>{children}</Flex>
    </Container>
  ) : null;
};

export default MarketingLayout;
