import { put, takeEvery, call, all } from 'redux-saga/effects'
import * as ServerApi from '../api/ServerApi';
import * as urls from '../urls';
import * as actions from '../actions/actions'
import {history} from '../index';

export function* watchAuthorization() {
  yield takeEvery('AUTH_USER', requestAuth);
}

export function* watchGetClientData() {
  yield takeEvery('GET_CLIENT_DATA', requestGetClientData);
}

export function* watchChangeUserData() {
  yield takeEvery('CHANGE_USER', requestChangeUser);
}

export function* watchRemoveUser() {
  yield takeEvery('REMOVE_USER', requestRemoveUser);
}

export function* watchAddUser() {
  yield takeEvery('ADD_USER', requestAddUser);
}

export function* watchGetUsers() {
  yield takeEvery('GET_USERS', requestGetUsers);
}

export function* watchGetClients() {
  yield takeEvery('GET_CLIENTS', requestGetClients);
}


export function* requestAuth(action) {
  try {
    const user = yield call(ServerApi.fetchAuthUser, action.loginForm);
    user.url = urls.statisticsPage;
    yield put({ type: 'SET_USER', user})
    history.push(urls.statisticsPage);
  } catch (error) {
    yield put({ type: 'LOGIN_ERROR', error});
  }
}

export function* requestGetClientData(action) {
  try {
    const clientData = yield call(ServerApi.fetchGetClientData, action.params);
    yield put({ type: 'LOAD_CLIENT_DATA', clientData});
  } catch(error) { 
    yield put({ type: 'GET_CLIENT_DATA_ERROR', error});
  }
}

export function* requestAddUser(action) {
  try {
    // yield call(ServerApi.fetchAddUser, action.addUserForm);
    yield put({ type: 'GET_USERS'});
    yield put({ type: 'CLOSE_MODAL'})
  } catch (error) {
    console.log(error);
    yield put({ type: 'ADD_USER_ERROR', error});
  }
}

export function* requestRemoveUser(action) {   
try {
    // yield call(ServerApi.fetchRemoveUser, action.id);
    yield put({ type: 'GET_USERS'});
    yield put({ type: 'CLOSE_MODAL'})
} catch (error) {
    yield put({ type: 'REMOVE_USER_ERROR', error});
  }
}

export function* requestChangeUser(action) {
  try {
    // yield call(ServerApi.fetchChangeUser, action.changeUserForm)
    yield put({ type: 'GET_USERS'});
    yield put({ type: 'CLOSE_MODAL'})
  }    
  catch (error) {
    yield put({ type: 'CHANGE_USER_ERROR', error});
  }
}

export function* requestGetUsers() {
  try {
    const users = yield call(ServerApi.fetchGetUsers);
    yield put({type: 'UPLOAD_USERS', users});
  }
  catch (error) {
    yield put({type: 'GET_USERS_ERROR', error});
  }
}

export function* requestGetClients() {
  try {
    const clients = yield call(ServerApi.fetchGetClients);
    yield put({type: 'UPLOAD_CLIENTS', clients});
  } catch (error) {
    yield put({type: 'GET_CLIENTS_ERROR', error})
  }
}



export function* rootSaga() {
  yield all([
    watchGetClientData(),
    watchAuthorization(),
    watchChangeUserData(),
    watchRemoveUser(),
    watchAddUser(),
    watchGetUsers(),
    watchGetClients()
  ])
}
