import React from "react";
import App from "next/app";
import UserContext from "../context/UserContext";
import Cookies from "js-cookie";
import parseJwt from "../lib/parseJwt";

import Header from "../components/header";

export default class MyApp extends App {
  state = {
    user: null,
    scope: null
  };
  componentDidMount = async () => {
    const updateLocal = Cookies.get("update");
    const idLocal = Cookies.get("id_token");
    const userLocal = localStorage.getItem("user");
    const scopeLocal = localStorage.getItem("scope");
    console.log("derp");
    if (updateLocal) {
      const { email } = parseJwt(Cookies.get("id_token"));
      const res = await fetch(`/api/user/details/${email}`);
      const user = await res.json();
      Cookies.remove("update");
      localStorage.setItem("user", JSON.stringify(user));
      console.log("Existing user updated:", user);
      const scope = scopeLocal || user.scopes[0].name;
      this.setState({ scope, user });
      return;
    }
    if (idLocal && userLocal) {
      console.log("Existing user logged in:", userLocal);
      const user = JSON.parse(userLocal);
      const scope = scopeLocal || user.scopes[0].name;
      this.setState({ scope, user });
      return;
    }
    if (idLocal && !userLocal) {
      const { email } = parseJwt(Cookies.get("id_token"));
      const res = await fetch(`/api/user/details/${email}`);
      const user = await res.json();
      localStorage.setItem("user", JSON.stringify(user));
      console.log("New user logged in:", user);
      const scope = scopeLocal || user.scopes[0].name;
      this.setState({ scope, user });
      return;
    }
  };
  updateUser = user => {
    localStorage.setItem("user", user);
    this.setState(prevState => ({
      ...prevState,
      user
    }));
  };
  updateScope = e => {
    const scope = e.target.value;
    localStorage.setItem("scope", scope);
    this.setState(prevState => ({
      ...prevState,
      scope
    }));
  };
  render() {
    const { Component, pageProps } = this.props;
    const { scope, user } = this.state;
    const { updateScope, updateUser } = this;
    return (
      <UserContext.Provider
        value={{
          scope,
          user,
          updateScope,
          updateUser
        }}
      >
        <Header />
        <Component {...pageProps} />
      </UserContext.Provider>
    );
  }
}
