import {history} from "../index";
import * as urls from "../urls";

const initialState = {
    users: [],
    user: {
      name: '',
      admin: false,
      loggedIn: false,
      url: null  
    },
    errors: {}
  }

  
  
  export default function reducer(state = {...initialState}, action) {
    switch (action.type) {
      case "ADD_USER":  
      return state;

      case "UPLOAD_USER":
      state.users.push(action.user);
      return {...state, users: [...state.users]}

      case "ADD_USER_ERROR":
      state.errors.addUserError = action.error;
      return {...state}

      case "REMOVE_USER":
      return {...state, errors: {}}

      case "UNLOAD_USER":
      state.users = state.users.filter(( user ) => {
          return user.id !== action.id;
      });
      return {...state, users: [...state.users]}

      case "REMOVE_USER_ERROR":
      state.errors.removeUserError = action.error;
      return {...state}

      case "AUTH_USER":
      return {state, errors: {}}

      case "SET_USER":
      localStorage.setItem('user', JSON.stringify(action.user));  
      return {...state, user: action.user}

      case "USER_REDIRECT":
      if(state.user) {
        state.user.url = action.url; 
      }
      history.push(action.url);
      return {...state, user: state.user}

      case "LOGIN_ERROR":
      state.errors.authError = action.error;
      return {...state}

      case "LOAD_USER_FROM_STORAGE":
      state.user = JSON.parse(localStorage.getItem('user'));
      if(state.user) {
        state.user.url = window.location.href.replace(urls.rootHome,'');
      } else {
        history.push('/statistics'); 
      }
      return {...state}

      case  "LOGOUT":
      localStorage.removeItem('user');
      state.user = initialState.user;
      history.push('/'); 
      return {...state};

      case "GET_USERS":  
      return {...state, errors: {}};

      case "UPLOAD_USERS":
      state.users = action.users;
      return {...state, users: [...state.users]}

      case "GET_USERS_ERROR":
      state.errors.getUsersError = action.error;
      return {...state}

      case "CHANGE_USER":  
      return {...state, errors: {}};

      case "REFRESH_USER":
      state.users = state.users.map((user) => {
          if(user.id === action.user.id) {
              user = action.user;
          }
          return user;
      })
      return {...state, users: [...state.users]}

      case "CHANGE_USER_ERROR":
      state.errors.changeUserError = action.error;
      return {...state}

      case "RESET_USERS_ERRORS":
        for(const key of action.errors) {
          state.errors[key] = ""
        }
      return {...state, errors: {...state.errors}}
      
      default:
        return state;
    }
  }