// * Modulz
import { Container, Divider, Heading, Text } from "@modulz/radix";

interface ErrorProps {
  text: string;
  title: string;
}

function Error({ text, title }: ErrorProps) {
  return (
    <Container size={1}>
      <Heading as="h1" mb={2} mt={4} size={4}>
        {title}
      </Heading>
      <Divider mb={2} />
      <Text>{text}</Text>
    </Container>
  );
}

export default Error;
