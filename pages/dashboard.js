import { useEffect, useState } from "react";
import Head from "next/head";
import Cookies from "js-cookie";
import parseJwt from "../lib/parseJwt";

import Header from "../components/header";

export default () => {
  const [isAuth, setAuth] = useState(false);
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    function getAuth() {
      if (Cookies.get("id_token")) {
        setAuth(true);
        setProfile(parseJwt(Cookies.get("id_token")));
        return null;
      }
    }
    getAuth();
  }, []);
  //   const getSecret = async () => {
  //     const res = await fetch("/api/data/secret");
  //     const secret = await res.text();
  //     const newProfile = { ...profile, secret };
  //     setProfile(newProfile);
  //   };
  const connectTwitter = () => {
    window.location = "http://localhost:3000/api/auth/twitter/connect";
  };
  return (
    <>
      <Head>
        <title>Tweet Review</title>
        <link
          rel="stylesheet"
          href="https://css.zeit.sh/v1.css"
          type="text/css"
        />
      </Head>
      <main>
        <Header loggedIn={isAuth} />
        {profile && profile.secret && <p>{profile.secret}</p>}
        <div className="handle">
          <label>Twitter Handle</label>
          <button onClick={connectTwitter}>Connect Twitter</button>
          {/* <button onClick={postUpdate}>Post Update</button> */}
        </div>
      </main>
      <style jsx>{`
        .buttons {
          display: flex;
          justify-content: space-between;
        }
        .handle {
          display: flex;
          flex-direction: column;
          margin-top: 16px;
        }
      `}</style>
    </>
  );
};
