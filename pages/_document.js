import Document, { Html, Head, Main, NextScript } from "next/document";

import { Box } from "@chakra-ui/core";

export default class MyDocument extends Document {
  render() {
    return (
      <>
        <Html>
          <Head />
          <body>
            <Box maxW={[320, 600, 960, 1260]} mx="auto">
              <Main />
              <NextScript />
            </Box>
          </body>
        </Html>
      </>
    );
  }
}
