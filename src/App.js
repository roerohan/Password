import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
  <Router>
      <Switch>
        <Route exact path="/">Password</Route>
        <Route exact path="/play">Play</Route>
      </Switch>
  </Router>
  );
}

export default App;
