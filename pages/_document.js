import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body className="container mx-auto px-8">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
