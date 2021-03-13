import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Game from "./game/Game";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Main} from "./main/Main";

import './index.scss';


ReactDOM.render(
  <React.StrictMode>
      <Router>
          <Switch>
              <Route path='/' component={Main} exact />
              <Route path='/game' component={Game} exact />
              <Route path='/game/:id' component={Game} />
          </Switch>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
