const initialState = {
    modal: {
        type: null,
        form: null,
        show: false
    },
    errors: {}
  }


  export default function reducer(state = initialState, action) {
    switch (action.type) {
        case "OPEN_MODAL":
            state.modal.formType = action.formType;
            state.modal.form = action.form;
            state.modal.show = true;   
        return {...state, modal: {...state.modal}};
    
        case "CLOSE_MODAL":
            state.modal.show = false;
        return {...state, modal: {...state.modal}}
        default:
        return state;
      }
  }