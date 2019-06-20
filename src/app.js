import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Home from './screens/home';
import About from './screens/about';
import NoMatch from './screens/NoPage';
import './app.css';

const app = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about/">About</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about/" component={About} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
};

app.propTypes = {};

export default app;
