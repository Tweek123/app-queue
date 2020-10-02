import React, {useState, useEffect} from 'react';
import { Button, Modal } from 'rsuite';
import FormEdit from '../forms/FormEdit';
import FormDelete from '../forms/FormDelete';
import FormAdd from '../forms/FormAddUser';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal, resetUsersErrors } from '../../actions/actions'

const ModalAdmin = () =>  {
      const dispatch = useDispatch();
      
      dispatch(resetUsersErrors([
        "addUserError",
        "removeUserError",
        "changeUserError"
      ]));

      const modal = useSelector(state => state.modalReducer.modal)
      const sizes = {
        "DELETE": "xs",
        "EDIT": "sm",
        "ADD": "sm"
      }
      const headlines = {
        "DELETE": "Delete user",
        "EDIT": "Edit user",
        "ADD": "Add user",
      }

      const headline = headlines[modal.formType]
      const size = sizes[modal.formType]

      const Form = ({formType}) => {
        switch (formType) {
          case "EDIT":   
          return <FormEdit/>
          case "DELETE":
          return <FormDelete/>
          case "ADD":
          return <FormAdd/>
          default:
          return null;
        }

      }


      return (
          <Modal size={size} centered show={modal.show} onHide={() => dispatch(closeModal())}>
            <Modal.Header>
            <Modal.Title>{headline}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form formType={modal.formType}/>
            </Modal.Body>
          </Modal>
      )
}



  export default ModalAdmin;