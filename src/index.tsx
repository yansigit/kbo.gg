import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Game from "./pages/game/Game";
import History from "./pages/history/History";
import 'bootstrap/dist/css/bootstrap.min.css'
import Main from "./pages/main/Main";
import {RecoilRoot} from "recoil";
import './index.scss';
import GameList from "./pages/game/GameList";
import Test from './Test';


ReactDOM.render(
  <React.StrictMode>
      <RecoilRoot>
          <Router>
              <Switch>
                  <Route path='/' component={Main} exact/>
                  <Route path='/game' component={GameList} exact/>
                  <Route path='/game/:id' component={Game}/>
                  <Route path='/history' component={History}/>
                  <Route path='/test' component={Test} exact/>
              </Switch>
          </Router>
      </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
