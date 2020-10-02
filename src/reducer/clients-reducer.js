

  let dateStart = new Date()
  dateStart = dateStart.setDate(dateStart.getDate() - 140);
  let dateEnd = new Date()
  dateEnd =  dateEnd.setDate(dateEnd.getDate() - 130);
  const dateRangeDefault = [new Date(dateStart), new Date(dateEnd)]

const initialState = {
    clients: [],
    client: {
      clientData: [],
      range: dateRangeDefault,
      changeInterval: false,
      name: null
    },
    errors: {}
  }
  
  export default function reducer(state = initialState, action) {
    switch (action.type) {
        case "GET_CLIENTS":  
        return state;
  
        case "UPLOAD_CLIENTS":
        state.clients = action.clients;
        state.client.id = action.clients[0].id;
        state.client.name = action.clients[0].name;
        return {...state, clients: [...state.clients], client: {...state.client}}
  
        case "GET_CLIENTS_ERROR":
        state.errors.getClientsError = action.error;
        return {...state}

        case "GET_CLIENT_DATA":
        return state

        case "LOAD_CLIENT_DATA":
        state.client.clientData = action.clientData;
        return {...state, client: {...state.client}}

        case "GET_CLIENT_DATA_ERROR":
        state.errors.getClientDataError = action.error;
        return {...state}

        case "SELECT_CLIENT":
        state.client.id = action.id;
        return {...state, client: {...state.client}}

        case "RESET_CLIENTS_ERRORS":
          for(const key of action.errors) {
            state.errors[key] = ""
          }
        return {...state, errors: {...state.errors}}

        case "CHANGE_INTERVAL":
        state.client.changeInterval = action.change;
        return {...state, client: {...state.client}}

        case "CHANGE_RANGE":
        state.client.range = action.range;
        return {...state, client: {...state.client}}

        default:
        return state;
      }
  }