import * as sagas from 'sagas/sagas'
import { expectSaga } from 'redux-saga-test-plan';
import "isomorphic-fetch";
import * as ServerApi from 'api/ServerApi';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';

describe('integration request remove user test', () => {
    let initialState = {
        users: [{
            username: "admin",
            isAdmin: true
        }],
        errors: {}
      }
  
    function reducer(state = initialState, action) {
        switch (action.type) {
            case "REMOVE_USER":
            return {...state}

            case "UNLOAD_USER":
            state.users = state.users.filter(( user ) => {
                return user.username !== action.username;
            });
            return {...state, users: [...state.users]}

            case "REMOVE_USER_ERROR":
            state.errors.removeUserError = action.error;
            return {...state}
          default:
        return state;
        }
    }

    it('should remove user', () => {
      const username = "admin"
      const expectedAction = {
        type: "REMOVE_USER",
        username
      }
  
    return  expectSaga(sagas.requestRemoveUser, expectedAction)
    .provide({
      async call({ fn }, next) {
         if (fn === ServerApi.fetchRemoveUser) {
           return null;
         }          
         return next();
       },
     })
     .put({ type: 'UNLOAD_USER', username})
     .run()
    })
  
    it('should make server error', () => {
      const username = "admin";
      const expectedAction = {
        type: "REMOVE_USER",
        username
      }
      const error = {status: 500, message: 'Server error'};

      return  expectSaga(sagas.requestRemoveUser, expectedAction)
      .provide([
        [matchers.call.fn(ServerApi.fetchRemoveUser), throwError(error)],
      ])
      .put({ type: 'REMOVE_USER_ERROR', error})
      .run()
      })

      it('should remove user from state', () => {
        initialState = {
            users: [{
                username: 'admin',
                isAdmin: true
            }],
            errors: {}
        }

        const username = 'admin'
        const expectedAction = {
          type: "REMOVE_USER",
          username
        }
    
      return  expectSaga(sagas.requestRemoveUser, expectedAction)
      .withReducer(reducer)
      .provide({
        async call({ fn }, next) {
           if (fn === ServerApi.fetchRemoveUser) {
             return null;
           }          
           return next();
         },
       })
       .hasFinalState({
        users: [],
        errors: {}
        })
       .run()
      })



      it('should load error in state', () => {
        const error = {status: 500, message: 'Server error'};
        initialState = {
            users: [{
                username: 'admin',
                isAdmin: true
            }],
            errors: {}
        }
        const username = 'admin'
        const expectedAction = {
          type: "REMOVE_USER",
          username
        }
    
      return  expectSaga(sagas.requestRemoveUser, expectedAction)
      .withReducer(reducer)
      .provide([
        [matchers.call.fn(ServerApi.fetchRemoveUser), throwError(error)],
      ])
      .hasFinalState({
       users: [{
           username: 'admin',
           isAdmin: true
       }],
       errors: {removeUserError: error}
       })
      .run()
      })
    })