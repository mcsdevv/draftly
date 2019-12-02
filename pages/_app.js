import React from "react";
import App from "next/app";
import UserContext from "../context/UserContext";
import Cookies from "js-cookie";
import parseJwt from "../lib/parseJwt";
import { withRouter } from "next/router";

import Header from "../components/header";

export default withRouter(
  class MyApp extends App {
    state = {
      scope: null,
      teams: null,
      user: null
    };
    componentDidMount = async () => {
      const updateLocal = Cookies.get("update");
      const idLocal = Cookies.get("id_token");
      const userLocal = localStorage.getItem("user");
      const scopeLocal = localStorage.getItem("scope");
      const teamsLocal = localStorage.getItem("teams");
      if (updateLocal) {
        const { email } = parseJwt(Cookies.get("id_token"));
        const res = await fetch(`/api/user/details/${email}`);
        const user = await res.json();
        Cookies.remove("update");
        localStorage.setItem("user", JSON.stringify(user));
        console.log("Existing user updated:", user);
        const scope = scopeLocal || user.scopes[0].name;
        const teams = JSON.parse(teamsLocal);
        console.log(teams);
        this.setState({ scope, teams, user });
        return;
      }
      if (idLocal && userLocal) {
        console.log("Existing user logged in:", userLocal);
        const user = JSON.parse(userLocal);
        const scope = scopeLocal || user.scopes[0].name;
        const teams = JSON.parse(teamsLocal);
        console.log(teams);
        this.setState({ scope, teams, user });
        return;
      }
      if (idLocal && !userLocal) {
        const { email } = parseJwt(Cookies.get("id_token"));
        const res = await fetch(`/api/user/details/${email}`);
        const user = await res.json();
        localStorage.setItem("user", JSON.stringify(user));
        console.log("New user logged in:", user);
        const scope = scopeLocal || user.scopes[0].name;
        const teams = JSON.parse(teamsLocal);
        console.log(teams);
        this.setState({ scope, teams, user });
        return;
      }
    };
    logoutUser = async () => {
      const res = await fetch("/api/auth/logout");
      if (res.status === 200) {
        Cookies.remove("id_token");
        Cookies.remove("access_token");
        localStorage.removeItem("user");
        this.setState({ user: false });
        this.props.router.push("/");
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
      const personalScope = this.state.user.scopes[0].name;
      if (scope === "new") {
        window.location = "/api/auth/twitter/connect";
      } else {
        localStorage.setItem("scope", scope);
        this.setState(prevState => ({
          ...prevState,
          scope
        }));
      }
      if (scope !== personalScope) this.updateTeams(scope);
    };
    updateTeams = async scope => {
      console.log("NEW TEAM", scope);
      const localTeams = localStorage.getItem("teams");
      const teams = JSON.parse(localTeams);
      if (teams !== null) {
        if (!teams[scope]) {
          const res = await fetch(`/api/team/details/${scope}`);
          const team = await res.json();
          const newTeams = { ...teams, [scope]: team };
          console.log("NEW", newTeams);
          localStorage.setItem("teams", JSON.stringify({ ...newTeams }));
          this.setState(prevState => ({ ...prevState, teams: newTeams }));
        }
      } else {
        const res = await fetch(`/api/team/details/${scope}`);
        const team = await res.json();
        const newTeams = { ...teams, [scope]: team };
        console.log("NEW", newTeams);
        localStorage.setItem("teams", JSON.stringify(newTeams));
        this.setState(prevState => ({ ...prevState, teams: newTeams }));
      }
    };
    render() {
      const { Component, pageProps } = this.props;
      const { scope, teams, user } = this.state;
      const { logoutUser, updateScope, updateUser } = this;
      return (
        <UserContext.Provider
          value={{
            logoutUser,
            scope,
            teams,
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
);
