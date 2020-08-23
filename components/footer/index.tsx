// * Modulz
import { Box, Container, Flex, Subheading } from "@modulz/radix";

// * Components
import Link from "@components/link";

const Footer = () => (
  <Box
    as="footer"
    sx={{
      bg: "gray100",
      borderTop: "1px solid",
      borderColor: "gray300",
      height: "60px",
      width: "100%",
    }}
  >
    <Container size={3} sx={{ height: "100%" }}>
      <Flex
        sx={{
          alignItems: "center",
          height: "100%",
          justifyContent: "space-between",
          maxWidth: "240px",
        }}
        mx="auto"
      >
        <Link href="/terms" type="plain">
          <Subheading>Terms</Subheading>
        </Link>
        <Link href="/privacy" type="plain">
          <Subheading>Privacy</Subheading>
        </Link>
        <Link href="/contact" type="plain">
          <Subheading>Contact</Subheading>
        </Link>
      </Flex>
    </Container>
  </Box>
);

export default Footer;
