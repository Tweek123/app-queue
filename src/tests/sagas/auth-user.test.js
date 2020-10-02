import * as sagas from 'sagas/sagas'
import { expectSaga } from 'redux-saga-test-plan';
import "isomorphic-fetch";
import * as ServerApi from 'api/ServerApi';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';

describe('integration request user authorization test', () => {
    let initialState = {
        user: {},
        errors: {}
      }
  
    function reducer(state = initialState, action) {
        switch (action.type) {
            case "AUTH_USER":
            return {...state}

            case "USER_REDIRECT":
            return {...state, user: action.user}

            case "LOGIN_ERROR":
            state.errors.authError = action.error;
            return {...state}
          default:
        return state;
        }
    }


    it('should authorise user', () => {
    const expectedAction = {
      type: "AUTH_USER",
      loginForm: {
        name: "admin",
        password: "admin"
      }
    }
  
    const user = "admin";
  
    return  expectSaga(sagas.requestAuth, expectedAction)
    .provide({
      async call({ fn }, next) {
         if (fn === ServerApi.fetchAuthUser) {
           return user;
         }          
         return next();
       },
     })
     .put({ type: 'USER_REDIRECT', user})
     .run()
    })
  
    it('should not authorise user', () => {
      const expectedAction = {
        type: "AUTH_USER",
        loginForm: {
          name: "admin",
          password: "admin"
        }
      }
  
      const error = {status: 403, message: 'Wrong username or password'};
  
      return  expectSaga(sagas.requestAuth, expectedAction)
      .provide([
        [matchers.call.fn(ServerApi.fetchAuthUser), throwError(error)],
      ])
       .put({ type: 'LOGIN_ERROR', error})
       .run()
      })
  
      it('should make server error', () => {
        const expectedAction = {
          type: "AUTH_USER",
          loginForm: {
            name: "admin",
            password: "admin"
          }
        }
  
        const error = {status: 500, message: 'Server error'};
  
      return  expectSaga(sagas.requestAuth, expectedAction)
      .provide([
        [matchers.call.fn(ServerApi.fetchAuthUser), throwError(error)],
      ])
      .put({ type: 'LOGIN_ERROR', error})
      .run()
      })

      it('should load authorise user in state', () => {
        initialState = {
            user: {},
            errors: {}
        }
        const expectedAction = {
          type: "AUTH_USER",
          loginForm: {
            name: "admin",
            password: "admin"
          }
        }
      
        const user = "admin";
      
        return  expectSaga(sagas.requestAuth, expectedAction)
        .withReducer(reducer)
        .provide({
          async call({ fn }, next) {
             if (fn === ServerApi.fetchAuthUser) {
               return user;
             }          
             return next();
           },
         })
         .hasFinalState({
            user,
            errors: {}
            })
           .run()
        })

        it('should load authorise user in state', () => {
            initialState = {
                user: {},
                errors: {}
            }
            const expectedAction = {
                type: "AUTH_USER",
                loginForm: {
                  name: "admin",
                  password: "admin"
                }
              }
        
            const error = {status: 500, message: 'Server error'};
        
            return  expectSaga(sagas.requestAuth, expectedAction)
            .withReducer(reducer)
            .provide([
              [matchers.call.fn(ServerApi.fetchAuthUser), throwError(error)],
            ])
            .hasFinalState({
                user: {},
                errors: {authError: error}
                })
               .run()
        })
    })