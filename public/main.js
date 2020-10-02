import "babel-polyfill"
import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import { createStore,combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Router, Route, Link, Switch } from "react-router-dom";
import  HomePage  from "./components/pages/homePage"
import  UserPage  from "./components/pages/userPage"
import { routerReducer, syncHistoryWithStore } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory';
import {getUsers,watchGetUsers } from './sagas/sagas'

function homePage() {  

  return <HomePage/>
}

function userPage() {  

  return <UserPage/>
}


function reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_USER":  
        form = action.formAddUser;  
        let id = state.users.length;
        let newUser = new Object;
        newUser.id = id;
        newUser.firstName = form.firstName.value;
        newUser.lastName = form.lastName.value;
        newUser.position = form.position.value;
        newUser.address = form.adress.value;
        newUser.avatarUrl = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y&s=400';
        newUser.comments = [];
        newUser.renderType = "HOME_RENDER";

        state.users.push(newUser);
        return { ...state, users: [...state.users]};

    case "REFRESH_USERS":     
      return { ...state, users: [...state.users]};
    case "ADD_COMMENT":     

        let form = action.formMessage;
        let comment = new Object;
        
        comment.title = form.title.value;
        comment.message = form.comment.value;
        comment.phone = form.phone.value; 
        state.users[action.id].comments.push(comment);

      return { ...state, users: [...state.users]};

      case "GET_USERS":   
      console.log("state.users");  
      return { ...state, users: [...state.users]};

      case "REF_USERS":
      console.log("state.users");
      console.log(state.users);
      state.users = [...action.data];
       
      return { ...state, users: [...state.users]};  

    default:
      return state;
  }
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({
    reducer: reducer,
    routing: routerReducer,
  }),
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(watchGetUsers);
sagaMiddleware.run(getUsers);



const history = syncHistoryWithStore(createHistory(), store);

ReactDOM.render((    
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={homePage}/>
          <Route exact path="/user" component={userPage}/>
        </Switch> 
      </Router>
    </Provider>

    ), document.getElementById('root'))