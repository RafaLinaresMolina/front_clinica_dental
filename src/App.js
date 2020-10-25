import React, { useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import './App.css';
import Dashboard from './containers/dashboard/Dashboard';
import Home from './containers/home/Home';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
        {!user ?
          <Route exact path="/" >
            <Home user={user} setUser={setUser} />
          </Route>
          :
          <Route exact path="/dashboard" >
            <Dashboard user={user} setUser={setUser} />
          </Route>}
         {user ?  <Redirect to="/dashboard" /> :  <Redirect to="/" />}
        </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
