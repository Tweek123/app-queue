import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, removeUser } from "../../actions/actions";
import {Form, FormGroup,  ButtonToolbar, Button, Message} from 'rsuite';

const FormDelete = () => {
    const dispatch = useDispatch();
    const formData = useSelector(state => state.modalReducer.modal.form)
    const error = useSelector(state => state.usersReducer.errors.removeUserError);
  
      return(
          <Form fluid     
          className={"form__delete"} 
          >
            <FormGroup>
              <h3 className={"form__delete-headline"}>Are you sure?</h3>  
              <ButtonToolbar  className={"toolbar"}>
                <Button className={"toolbar__button"} color="red" appearance="primary" onClick={()=> dispatch(removeUser(formData.id))}>Delete</Button>
                <Button className={"toolbar__button"} onClick={()=> dispatch(closeModal())}>Cancel</Button>
              </ButtonToolbar>
            </FormGroup>
            {error? <Message  className={'login-form__login-error'} type="error" description={error.message} />: false}
          </Form>
    )

  }

  export default FormDelete;