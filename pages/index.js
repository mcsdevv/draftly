import { useEffect, useState } from "react";
import Head from "next/head";

export default () => {
  const [isAuth, setAuth] = useState(false);
  return (
    <>
      <Head>
        <title>Tweet Review</title>
      </Head>
      <main>
        <h1>Hello World!</h1>
        <button>{!isAuth ? "Login" : "Logout"}</button>
        <h2>{isAuth}</h2>
      </main>
      <style jsx>{`
        body: {
          color: #666;
        }
      `}</style>
    </>
  );
};
