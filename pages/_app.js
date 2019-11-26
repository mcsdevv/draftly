import React from "react";
import App from "next/app";
// import Router from "next/router";
import UserContext from "../context/UserContext";
import Cookies from "js-cookie";
import parseJwt from "../lib/parseJwt";

export default class MyApp extends App {
  state = {
    user: null
  };

  componentDidMount = async () => {
    const idLocal = Cookies.get("id_token");
    const userLocal = localStorage.getItem("user");
    if (idLocal && userLocal) {
      console.log("Existing user logged in:", userLocal);
      this.setState(JSON.parse(userLocal));
    }
    if (idLocal && !userLocal) {
      const { email } = parseJwt(Cookies.get("id_token"));
      const res = await fetch(`/api/user/details/${email}`);
      const user = await res.json();
      localStorage.setItem("user", JSON.stringify(user));
      console.log("New user logged in:", user);
      this.setState(user);
    }
    // if (user) {
    //   this.setState({
    //     user
    //   });
    // } else {
    //   Router.push("/");
    // }
  };

  //   signIn = (username, password) => {
  //     localStorage.setItem("coolapp-user", username);

  //     this.setState(
  //       {
  //         user: username
  //       },
  //       () => {
  //         Router.push("/");
  //       }
  //     );
  //   };

  //   signOut = () => {
  //     localStorage.removeItem("coolapp-user");
  //     this.setState({
  //       user: null
  //     });
  //     Router.push("/signin");
  //   };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <UserContext.Provider
        value={{
          user: this.state.user
          //   signIn: this.signIn,
          //   signOut: this.signOut
        }}
      >
        <Component {...pageProps} />
      </UserContext.Provider>
    );
  }
}
