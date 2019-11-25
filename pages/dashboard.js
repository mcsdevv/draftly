import { useEffect, useState } from "react";
import Head from "next/head";
import Cookies from "js-cookie";
import parseJwt from "../lib/parseJwt";

import Header from "../components/header";

export default () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function getUser() {
      const idLocal = Cookies.get("id_token");
      const userLocal = localStorage.getItem("user");
      if (idLocal && userLocal) {
        console.log("Existing user logged in:", userLocal);
        setUser(JSON.parse(userLocal));
      }
      if (idLocal && !userLocal) {
        const { email } = parseJwt(Cookies.get("id_token"));
        const res = await fetch(`/api/user/details/${email}`);
        const user = await res.json();
        localStorage.setItem("user", JSON.stringify(user));
        console.log("New user logged in:", user);
        setUser(user);
      }
      return null;
    }
    getUser();
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
        <Header loggedIn={user} />
        {user && user.secret && <p>{user.secret}</p>}
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
