import React, { Component } from 'react';
import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route, IndexRedirect, hashHistory } from "react-router";

import Layout from "./components/Layout"
import Pessoas from "./components/Pessoas"
import Itens from "./components/Itens"
 
// Needed for onTouchTap 
// http://stackoverflow.com/a/34015469/988941 
injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Layout}>
          <IndexRedirect to="/pessoas" />
          <Route path="pessoas" component={Pessoas}></Route>
          <Route path="itens" component={Itens}></Route>
        </Route>
      </Router>
    );
  }
}

export default App;
