import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <>
        <Html>
          <Head />
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
        <style jsx>{`
          body {
            max-width: 1260px;
          }
        `}</style>
      </>
    );
  }
}
