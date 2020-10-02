

describe('integration select client test', () => {
    const initialState = {
      client: {}
    }

    function reducer(state = {...initialState}, action) {
      switch (action.type) {
        case 'SELECT_CLIENT':  
        state.client = action.client;
        return {...state};
  
        default:
        return state;
      }
    }

    it('should load selected client in state', () => {

      const client = {
        name: 'name'
      }
      expect(
        reducer({...initialState}, {
          type: 'SELECT_CLIENT',
          client
        })
      ).toEqual({
            client: {
              name: 'name'
            }
          }
        )
    })
  });