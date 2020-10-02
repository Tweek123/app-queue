import * as sagas from 'sagas/sagas'
import { expectSaga } from 'redux-saga-test-plan';
import "isomorphic-fetch";
import * as ServerApi from 'api/ServerApi';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';


  describe('integration request get clients test', () => {
    let initialState = {
      clients: [],
      errors: {}
    }

    function reducer(state = initialState, action) {
      switch (action.type) {
        case "GET_CLIENTS":  
        return {...state};
  
        case "UPLOAD_CLIENTS":
        state.clients = action.clients;
        return {...state, clients: [...state.clients]}
  
        case "GET_CLIENTS_ERROR":
        state.errors.getClientsError = action.error;
        return {...state}
  
        default:
      return state;
      }
    }

    it('should get clients', () => {
    const expectedAction = {
      type: "GET_CLIENTS"
    }
    
    const client = {
        name: "name" 
    };

    const clients = [client];
  
    return  expectSaga(sagas.requestGetClients, expectedAction)
    .provide({
      async call({ fn }, next) {
         if (fn === ServerApi.fetchGetClients) {
           return clients;
         }          
         return next();
       },
     })
     .put({ type: 'UPLOAD_CLIENTS', clients})
     .run()
  
    })
  
    it('should make server error', () => {
      const expectedAction = {
        type: "GET_CLIENTS"
      }
  
      const error = {status: 500, message: 'Server error'};
      return  expectSaga(sagas.requestGetClients, expectedAction)
      .provide([
        [matchers.call.fn(ServerApi.fetchGetClients), throwError(error)],
      ])
      .put({ type: 'GET_CLIENTS_ERROR', error})
      .run()
      })


      it('should load clients in state', () => {
        initialState = {
          clients: [],
          errors: {}
        }
        const expectedAction = {
          type: 'GET_CLIENTS'
        }
    
      const client = {
        name: "name",
      };

      const clients = [client];
    
      return  expectSaga(sagas.requestGetClients, expectedAction)
      .withReducer(reducer)
      .provide({
        async call({ fn }, next) {
           if (fn === ServerApi.fetchGetClients) {
             return clients;
           }          
           return next();
         },
       })
       .hasFinalState({
        clients: [client],
        errors: {}
      })
       .run()


      })

      it('should load server error in state', () => {
        initialState = {
          clients: [],
          errors: {}
        }
        
        const expectedAction = {
          type: "GET_CLIENTS"
        }
    
        const error = {status: 500, message: 'Server error'};
    
      return  expectSaga(sagas.requestGetClients, expectedAction)
      .withReducer(reducer)
      .provide([
        [matchers.call.fn(ServerApi.fetchGetClients), throwError(error)],
      ])
       .hasFinalState({
        clients: [],
        errors: {getClientsError: error}
      })
       .run()
      })
    })

    