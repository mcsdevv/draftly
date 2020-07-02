import Document, { Html, Head, Main, NextScript } from "next/document";

const Document = () => (
  <Html lang="en">
    <Head>
      <title>Tweet Review</title>
      <meta
        name="description"
        content="Draft, review, approve, and publish tweets."
      />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
