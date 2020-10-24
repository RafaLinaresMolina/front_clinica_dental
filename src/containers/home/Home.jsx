import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "../login/Login";
import Register from "../register/Register";
import HomeInfo from "./HomeInfo";
import "./Home.scss";

import Header from "../header/Header";
function Home({ user, setUser }) {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Header />
          <HomeInfo />
        </Route>
        <Route exact path="/login">
          <Login user={user} setUser={setUser} />
        </Route>
        <Route exact path="/register" component={Register} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default Home;
