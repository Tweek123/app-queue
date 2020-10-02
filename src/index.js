import "babel-polyfill";
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { Router, Route, Switch} from "react-router";
import  HomePage  from "./components/pages/HomePage";
import  StatisticsPage  from "./components/pages/StatisticsPage";
import { createBrowserHistory } from 'history';
import './css/main.css';
import  UsersPage  from "./components/pages/UsersPage";
import { getClientData } from './actions/actions';
import store from './store';


export const history = createBrowserHistory();

console.log(history);
ReactDOM.render((    
    <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={HomePage}>
            </Route>
            <Route exact path="/users" component={UsersPage}/>
            <Route path="/statistics" component={StatisticsPage}/>
          </Switch> 
        </Router>
    </Provider>

    ), document.getElementById('root'))

