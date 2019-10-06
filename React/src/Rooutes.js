import React from 'react';
import {BrowserRouter,  Route,  Switch} from 'react-router-dom';

import Welcome from './componentes/Welcome';
import Home from './componentes/Home';
import Login from './componentes/Login';
import Signup from './componentes/SignUp';


const Routes = () => (
  <BrowserRouter >
      <Switch>
          <Route exact path="/" component={Welcome}/>
          <Route path="/home" component={Home}/>
          <Route path="/Login" component={Login}/>
          <Route path="/Signup" component={Signup}/>
      </Switch>
  </BrowserRouter>
);

export default Routes;