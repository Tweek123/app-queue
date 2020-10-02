import * as sagas from 'sagas/sagas'
import { expectSaga } from 'redux-saga-test-plan';
import "isomorphic-fetch";
import * as ServerApi from 'api/ServerApi';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';


  describe('integration request add user test', () => {
    let initialState = {
      users: [],
      errors: {}
    }

    function reducer(state = initialState, action) {
      switch (action.type) {
        case "ADD_USER":  
        return {...state};
  
        case "UPLOAD_USER":
        state.users.push(action.user);
        return {...state, users: [...state.users]}
  
        case "ADD_USER_ERROR":
        state.errors.addUserError = action.error;
        return {...state}
  
        default:
      return state;
      }
    }

    it('should add user', () => {
      const expectedAction = {
        type: "ADD_USER",
        addUserForm: {
          username: "admin",
          password: "admin",
          isAdmin: true
        }
      }
  
    const user = {
      username: "admin",
      password: "admin",
      isAdmin: true
    };
  
    return  expectSaga(sagas.requestAddUser, expectedAction)
    .provide({
      async call({ fn }, next) {
         if (fn === ServerApi.fetchAddUser) {
           return null;
         }          
         return next();
       },
     })
     .put({ type: 'UPLOAD_USER', user})
     .run()
  
    })
  
    it('should make server error', () => {
      const expectedAction = {
        type: "ADD_USER",
        addUserForm: {
          username: "admin",
          password: "admin",
          isAdmin: true
        }
      }
  
      const error = {status: 500, message: 'Server error'};
      return  expectSaga(sagas.requestAddUser, expectedAction)
      .provide([
        [matchers.call.fn(ServerApi.fetchAddUser), throwError(error)],
      ])
      .put({ type: 'ADD_USER_ERROR', error})
      .run()
      })

      it('should make server error login exist', () => {
        const expectedAction = {
          type: "ADD_USER",
          addUserForm: {
            username: "admin",
            password: "admin",
            isAdmin: true
          }
        }
    
        const error = {status: 409, message: 'This login arledy exist'};
        return  expectSaga(sagas.requestAddUser, expectedAction)
        .provide([
          [matchers.call.fn(ServerApi.fetchAddUser), throwError(error)],
        ])
        .put({ type: 'ADD_USER_ERROR', error})
        .run()
        })


      it('should add user in state', () => {
        
        const expectedAction = {
          type: "ADD_USER",
          addUserForm: {
            username: "admin",
            password: "admin",
            isAdmin: true
          }
        }
    
      const user = {
        username: "admin",
        password: "admin",
        isAdmin: true
      };
    
      return  expectSaga(sagas.requestAddUser, expectedAction)
      .withReducer(reducer)
      .provide({
        async call({ fn }, next) {
           if (fn === ServerApi.fetchAddUser) {
             return null;
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
          type: "ADD_USER",
          addUserForm: {
            username: "admin",
            password: "admin",
            isAdmin: true
          }
        }
    
        const error = {status: 500, message: 'Server error'};
    
      return  expectSaga(sagas.requestAddUser, expectedAction)
      .withReducer(reducer)
      .provide([
        [matchers.call.fn(ServerApi.fetchAddUser), throwError(error)],
      ])
       .hasFinalState({
        users: [],
        errors: {addUserError: error}
      })
       .run()
    
      })

      it('should load server error login exist', () => {
        initialState = {
          users: [],
          errors: {}
        }
        
        const expectedAction = {
          type: "ADD_USER",
          addUserForm: {
            username: "admin",
            password: "admin",
            isAdmin: true
          }
        }
    
      const error = {status: 409, message: 'This login arledy exist'};
    
      return  expectSaga(sagas.requestAddUser, expectedAction)
      .withReducer(reducer)
      .provide([
        [matchers.call.fn(ServerApi.fetchAddUser), throwError(error)],
      ])
       .hasFinalState({
        users: [],
        errors: {addUserError: error}
      })
       .run()
    
      })
    })

    