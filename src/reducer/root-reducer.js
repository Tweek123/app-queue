import {combineReducers} from 'redux'
import usersReducer from './users-reducer';
import clientsReducer from './clients-reducer';
import modalReducer from './modal-form-reducer';

export default combineReducers({
    clientsReducer,
    usersReducer,
    modalReducer
  })