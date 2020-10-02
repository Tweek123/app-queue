import * as sagas from 'sagas/sagas'
import { expectSaga } from 'redux-saga-test-plan';
import "isomorphic-fetch";
import * as ServerApi from 'api/ServerApi';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';


  describe('integration request get users test', () => {
    let initialState = {
      users: [],
      errors: {}
    }

    function reducer(state = initialState, action) {
      switch (action.type) {
        case "GET_USERS":  
        return {...state};
  
        case "UPLOAD_USERS":
        state.users = action.users;
        return {...state, users: [...state.users]}
  
        case "GET_USERS_ERROR":
        state.errors.getUsersError = action.error;
        return {...state}
  
        default:
      return state;
      }
    }

    it('should get users', () => {
      const expectedAction = {
        type: "GET_USERS"
      }
    
    const user = {
      username: "admin",
      password: "admin",
      isAdmin: true
    };

    const users = [user];
  
    return  expectSaga(sagas.requestGetUsers, expectedAction)
    .provide({
      async call({ fn }, next) {
         if (fn === ServerApi.fetchGetUsers) {
           return users;
         }          
         return next();
       },
     })
     .put({ type: 'UPLOAD_USERS', users})
     .run()
  
    })
  
    it('should make server error', () => {
      const expectedAction = {
        type: "GET_USERS"
      }
  
      const error = {status: 500, message: 'Server error'};
      return  expectSaga(sagas.requestGetUsers, expectedAction)
      .provide([
        [matchers.call.fn(ServerApi.fetchGetUsers), throwError(error)],
      ])
      .put({ type: 'GET_USERS_ERROR', error})
      .run()
      })


      it('should load users in state', () => {
        initialState = {
          users: [],
          errors: {}
        }
        const expectedAction = {
          type: 'GET_USERS'
        }
    
      const user = {
        username: "admin",
        password: "admin",
        isAdmin: true
      };

      const users = [user];
    
      return  expectSaga(sagas.requestGetUsers, expectedAction)
      .withReducer(reducer)
      .provide({
        async call({ fn }, next) {
           if (fn === ServerApi.fetchGetUsers) {
             return users;
           }          
           return next();
         },
       })
       .hasFinalState({
        users: [user],
        errors: {}
      })
       .run()


      })

      it('should load server error in state', () => {
        initialState = {
          users: [],
          errors: {}
        }
        
        const expectedAction = {
          type: "GET_USERS"
        }
    
        const error = {status: 500, message: 'Server error'};
    
      return  expectSaga(sagas.requestGetUsers, expectedAction)
      .withReducer(reducer)
      .provide([
        [matchers.call.fn(ServerApi.fetchGetUsers), throwError(error)],
      ])
       .hasFinalState({
        users: [],
        errors: {getUsersError: error}
      })
       .run()
      })
    })

    