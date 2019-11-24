import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Cookies from "js-cookie";
import parseJwt from "../lib/parseJwt";

export default () => {
  const [isAuth, setAuth] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function getUser() {
      if (Cookies.get("id_token")) {
        const { email } = parseJwt(Cookies.get("id_token"));
        const res = await fetch(`/api/user/details/${email}`);
        const user = await res.json();
        console.log("USER", user);
        setUser(user);
        setAuth(true);
        return null;
      }
    }
    getUser();
  }, []);
  const getSecret = async () => {
    const res = await fetch("/api/data/secret");
    const secret = await res.text();
    const newUser = { ...user, secret };
    setUser(newUser);
  };
  const logout = async () => {
    const res = await fetch("/api/auth/logout");
    if (res.status === 200) {
      Cookies.remove("id_token");
      setAuth(false);
      setUser(null);
    }
  };
  const connectTwitter = () => {
    window.location = "http://localhost:3000/api/auth/twitter/connect";
  };
  // const postUpdate = async () => {
  //   const res = fetch
  // }
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
        <h1>Tweet Review</h1>
        <div className="buttons">
          <button onClick={getSecret}>Tell Me a Secret!</button>
          {!isAuth ? (
            <Link href={"/api/auth/login"}>
              <a>
                <button>Login</button>
              </a>
            </Link>
          ) : (
            <button onClick={logout}>Logout</button>
          )}
        </div>
        {user && user.secret && <p>{user.secret}</p>}
        <button onClick={connectTwitter}>Connect Twitter</button>
        {/* <button onClick={postUpdate}>Post Update</button> */}
      </main>
      <style jsx>{`
        .buttons {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </>
  );
};
