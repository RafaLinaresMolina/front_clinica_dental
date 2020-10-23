import React from "react";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import Login from "../login/Login";
import Register from "../register/Register";
import HomeInfo from "./HomeInfo";
import "./Home.scss"
function Home({user,setUser}) {
  return (
    <div className="homeContainer">
      <div className="buttons">
            <Link to="/login">To Login</Link>
            <Link to="/register">To Register</Link>
        <BrowserRouter>
        <Switch>
          <Route exact path="/" >
            <HomeInfo />
          </Route>
          <Route exact path="/login" >
            <Login user={user} setUser={setUser}/>
            </Route>
          <Route exact path="/register" component={Register} />
          <Redirect to="/" />
        </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default Home;
