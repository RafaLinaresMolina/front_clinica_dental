import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import CustomNotification from "./component/CustomNotification";
import Dashboard from "./containers/dashboard/Dashboard";
import Home from "./containers/home/Home";
import { READ_USER } from "./redux/types";

const App = (props) => {
  useEffect(() => {
    try {
      if (!props.user.email) {
        const localUser = JSON.parse(localStorage.getItem("user"));
        props.dispatch({ type: READ_USER, payload: localUser });
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="App">
      <CustomNotification/>
      <BrowserRouter>
        <Switch>
          {!props.user?.email ? (
            <Route exact path="/">
              <Home />
            </Route>
          ) : (
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
          )}
          {props.user?.email ? (
            <Redirect to="/dashboard" />
          ) : (
            <Redirect to="/" />
          )}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps)(App);
