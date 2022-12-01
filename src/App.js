import React from 'react'
import './App.css';
import {BrowserRouter, Route, Router, Switch} from "react-router-dom";
import Login from './Pages/Auth/Login'
import Site from './Pages/Site/Sites'
import CreateSite from './Pages/Site/Create'
import CreateUser from './Pages/User/Create'
import EditSite from './Pages/Site/Edit'
import history from './Components/history'
import User from './Pages/User/Users';
import NotFound from './Components/404'

function App() {
  return (
      <html dir="rtl" lang="ar">
      <BrowserRouter>
          <Router history={history}>
              <Switch>
                  <Route path={"/"} component={Login} exact/>
                  <Route path={"/home"} component={Login} exact/>
                  <Route path={"/site"} component={Site} exact/>
                  <Route path={"/site/create"} component={CreateSite} exact/>
                  <Route path={"/user"} component={User} exact/>
                  <Route path={"/site/create"} component={CreateSite} exact/>
                  <Route path={"/user/create"} component={CreateUser} exact/>

                  <Route path={"/site/:siteId"} component={EditSite} exact/>
                  <Route path="*" component={NotFound}/>
              </Switch>
          </Router>
      </BrowserRouter>
      </html>
  );
}

export default App;
