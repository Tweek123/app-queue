import * as sagas from 'sagas/sagas'
import { expectSaga } from 'redux-saga-test-plan';
import "isomorphic-fetch";
import * as ServerApi from 'api/ServerApi';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';


  describe('integration request change user test', () => {
    let initialState = {
      users: [],
      errors: {}
    }

    function reducer(state = initialState, action) {
      switch (action.type) {
        case "CHANGE_USER":  
        return {...state};
  
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
  
        default:
      return state;
      }
    }

    it('should change user', () => {
        const user = {
          username: "admin",
          password: "admin",
          isAdmin: true
        }

        const expectedAction = {
          type: "CHANGE_USER_DATA",
          changeUserForm: {
            username: "admin",
            password: "admin",
            isAdmin: true
          }
        }
    

      return  expectSaga(sagas.requestChangeUser, expectedAction)
      .provide({
        async call({ fn }, next) {
           if (fn === ServerApi.fetchChangeUser) {
             return null;
           }          
           return next();
         },
       })
       .put({ type: 'REFRESH_USER', user})
       .run()
    
      })
    
      it('should make server error', () => {

        const expectedAction = {
          type: "CHANGE_USER_DATA",
          changeUserForm: {
            username: "admin",
            password: "admin",
            isAdmin: true
          }
        }
    
        const error = {status: 500, message: 'Server error'};
        return  expectSaga(sagas.requestChangeUser, expectedAction)
        .provide([
          [matchers.call.fn(ServerApi.fetchChangeUser), throwError(error)],
        ])
        .put({ type: 'CHANGE_USER_ERROR', error})
        .run()
        })

        it('should make server error user arledy exist', () => {
    
            const expectedAction = {
              type: "CHANGE_USER_DATA",
              changeUserForm: {
                username: "admin",
                password: "admin",
                isAdmin: true
              }
            }
        
            const error = {status: 409, message: 'This login arledy exist'};
            return  expectSaga(sagas.requestChangeUser, expectedAction)
            .provide([
              [matchers.call.fn(ServerApi.fetchChangeUser), throwError(error)],
            ])
            .put({ type: 'CHANGE_USER_ERROR', error})
            .run()
        })


        it('should change user in state', () => {
            const user = {
                id: 1,
                username: "admin",
                password: "admin",
                isAdmin: true
              };

            const expectedAction = {
              type: "CHANGE_USER",
              changeUserForm: {
                id: 1,
                username: "newadmin",
                password: "newadmin",
                isAdmin: false
              }
            }

            const expectedUser = {
                  id: 1,
                  username: "newadmin",
                  password: "newadmin",
                  isAdmin: false
              }

            initialState = {
                users: [user],
                errors: {}
              }
        

        
          return  expectSaga(sagas.requestChangeUser, expectedAction)
          .withReducer(reducer)
          .provide({
            async call({ fn }, next) {
               if (fn === ServerApi.fetchChangeUser) {
                 return null;
               }          
               return next();
             },
           })
           .hasFinalState({
            users: [expectedUser],
            errors: {}
          })
           .run()
    
    
          })
    })

    