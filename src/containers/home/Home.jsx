import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import HomeInfo from "./HomeInfo";
import "./Home.scss";

import Header from "../header/Header";
function Home() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Header/>
          <HomeInfo />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Home;
