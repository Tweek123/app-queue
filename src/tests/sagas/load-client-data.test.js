import * as sagas from 'sagas/sagas'
import { expectSaga } from 'redux-saga-test-plan';
import "isomorphic-fetch";
import * as ServerApi from 'api/ServerApi';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';

describe('integration request load data test', () => {
    let initialState = {
        clientData: {},
        errors: {}
      }
  
    function reducer(state = initialState, action) {
        switch (action.type) {
            case "GET_CLIENT_DATA":
            return {...state}

            case "LOAD_CLIENT_DATA":
            state.client.clientData = action.clientData;
            return {...state}

            case "GET_CLIENT_DATA_ERROR":
            state.errors.getClientDataError = action.error;
            return {...state}
          default:
        return state;
        }
    }




    let dateStart = new Date()
    dateStart = dateStart.setDate(dateStart.getDate() - 110);
    let dateEnd = new Date()
    dateEnd =  dateEnd.setDate(dateEnd.getDate() - 100);
    const dateRange = [new Date(dateStart), new Date(dateEnd)]

  
        it('should load data', () => {
            const expectedAction = {
              type: "GET_CLIENT_DATA",
              range: dateRange
            }

            const clientData = [
              { time: '2020-05-17T18:46:39Z', value: 71, client: 1 },
              { time: '2020-05-21T17:44:25Z', value: 78, client: 1 },
              { time: '2020-05-22T02:51:22Z', value: 45, client: 1 },
              { time: '2020-05-26T08:00:59Z', value: 22, client: 1 }
            ]

           return expectSaga(sagas.requestGetClientData, expectedAction)
                 .provide({
                  async call({ fn }, next) {
                     if (fn === ServerApi.fetchGetClientData) {
                       return clientData;
                     }          
                     return next();
                   },
                 })
                 .put({ type: 'LOAD_CLIENT_DATA', clientData})
                 .run()
        })


        it('should make server error', () => {
          const expectedAction = {
            type: "GET_CLIENT_DATA",
            range: dateRange
          }

          const error = {status: 500, message: 'Server error'};
          return  expectSaga(sagas.requestGetClientData, expectedAction)
          .provide([
            [matchers.call.fn(ServerApi.fetchGetClientData), throwError(error)],
          ])
          .put({ type: 'GET_CLIENT_DATA_ERROR', error})
          .run()
        })

        it('should load client data in state', () => {
            initialState = {
                client: {name: 'name'},
                errors: {}
            }

            const expectedAction = {
                type: "GET_CLIENT_DATA",
                range: dateRange
              }
        
            const clientData = [
                { time: '2020-05-17T18:46:39Z', value: 71, client: 1 },
                { time: '2020-05-21T17:44:25Z', value: 78, client: 1 },
                { time: '2020-05-22T02:51:22Z', value: 45, client: 1 },
                { time: '2020-05-26T08:00:59Z', value: 22, client: 1 }
              ]
        
            return expectSaga(sagas.requestGetClientData, expectedAction)
            .withReducer(reducer)
            .provide({
             async call({ fn }, next) {
                if (fn === ServerApi.fetchGetClientData) {
                  return clientData;
                }          
                return next();
              },
            })
            .hasFinalState({
              client: {name: 'name', clientData},
              errors: {}
              })
            .run()
        })

        it('should load error in state', () => {
            initialState = {
                client: {name: 'name'},
                errors: {}
            }

            const expectedAction = {
                type: "GET_CLIENT_DATA",
                range: dateRange
            }  
            const error = {status: 500, message: 'Server error'};
            return  expectSaga(sagas.requestGetClientData, expectedAction)
            .withReducer(reducer)
            .provide([
              [matchers.call.fn(ServerApi.fetchGetClientData), throwError(error)],
            ])
            .hasFinalState({
                client: {name: 'name'},
                errors: {getClientDataError: error}
            })
            .run()
        })
})