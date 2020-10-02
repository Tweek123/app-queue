import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal, addUser } from "../../actions/actions";
import { Checkbox, Form, FormGroup, ControlLabel, FormControl, ButtonToolbar, Button, Message} from 'rsuite';

const FormAdd = () => {
    const dispatch = useDispatch();
    const error = useSelector(state => state.usersReducer.errors.addUserError);

    const initForm ={
      username: "",
      email: "",
      is_superuser: false,
      first_name: "",
      last_name: "",
      password: "",
      confirmpassword: ""
    }


    const errorsInit = {
      usernameErrorValid: "",
      emailErrorValid: "",
      first_nameErrorValid: "",
      last_nameErrorValid: "",
      passwordErrorValid: "",
      confirmpasswordErrorValid: ""
    }

    const [form, setForm] = useState({...initForm});
    const [errors, setErrors] = useState({...errorsInit});

    const formSumbit = () => { 
        resetErrors(errors);
        const valid = validation(form);
        if(valid) {
          const data = prepareData(form);
          dispatch(addUser(data));
        }
    }

    const emailValidator = (email) => { 
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
    
    const validation = (form) => {
      let hasError = false;
      if(checkEmptyFields(form)) {
        hasError = true
      }

      if(checkValidErrors(form)) {
        hasError = true
      }

      setErrors({...errors})
      return !hasError;
    }

    const checkEmptyFields = (form) => {
      form.username? errors.usernameErrorValid="":errors.usernameErrorValid="Username must be not empty";  
      form.email? errors.emailErrorValid="":errors.emailErrorValid="Email must be not empty";
      form.first_name? errors.first_nameErrorValid="":errors.first_nameErrorValid="First name must be not empty";
      form.last_name? errors.last_nameErrorValid="":errors.last_nameErrorValid="Last name must be not empty";
      form.password? errors.passwordErrorValid="":errors.passwordErrorValid="Password must be not empty";
      form.confirmpassword? errors.confirmpasswordErrorValid="":errors.confirmpasswordErrorValid="Confirm password must be not empty";

      return hasErrors(errors);
    }

    const checkValidErrors = (form) => {
        if(!errors.emailErrorValid) {
          emailValidator(form.email)? errors.emailErrorValid="": errors.emailErrorValid="Not valid email";
        }
        if(!errors.passwordErrorValid && !errors.confirmpasswordErrorValid) {
            if(form.password !== form.confirmpassword) {
            errors.passwordErrorValid="Password not coincide"
            errors.confirmpasswordErrorValid="Password not coincide";
          }
        }

        return hasErrors(errors);       
    }

    const prepareData = (form) => {
       const data = {
        username: form.username,
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        password: form.password,
        is_superuser: form.is_superuser
       }

       return data;
      
    }

    const resetErrors = (errors) => {
      for(const error in errors) {
        errors[error] = "";   
      }
    }


    const hasErrors = (errors) => {
      for(const error in errors) {
        if(errors[error]) { 
          return true;
        }
      }
    }

      return(
          <Form fluid     
          className={"form__edit"} 
          formValue={form}
          onChange={form => {
            setForm(form);
          }}>
            <FormGroup>
              <ControlLabel className={"form__edit-headline"}>Username</ControlLabel>
              <FormGroup>
                <FormControl name="username"
                errorMessage={errors.usernameErrorValid?errors.usernameErrorValid:""}
                />
              </FormGroup>
            </FormGroup>

            <FormGroup>
              <ControlLabel className={"form__edit-headline"}>Email</ControlLabel>
              <FormGroup >
                <FormControl name="email"
                errorMessage={errors.emailErrorValid?errors.emailErrorValid:""}/>
              </FormGroup>
            </FormGroup>

            <FormGroup>
            <ControlLabel className={"form__edit-headline"}>Admin</ControlLabel>
              <FormControl 
              name ="is_superuser"
              value={form.is_superuser? true: false}
              accepter={Checkbox}
              inline
              checked={form.is_superuser}
              onChange={() => {
                form.is_superuser = !form.is_superuser;
                setForm({...form});
                }
              }
              />
            </FormGroup>

            <FormGroup>
              <ControlLabel className={"form__edit-headline"}>First name</ControlLabel>
              <FormGroup>
                <FormControl name="first_name"
                errorMessage={errors.first_nameErrorValid?errors.first_nameErrorValid:""}
                />
              </FormGroup>
            </FormGroup>

            <FormGroup>
              <ControlLabel className={"form__edit-headline"}>Last name</ControlLabel>
              <FormGroup>
                <FormControl name="last_name"
                errorMessage={errors.last_nameErrorValid?errors.last_nameErrorValid:""}/>
              </FormGroup>
            </FormGroup>

            <FormGroup>
              <ControlLabel className={"form__edit-headline"}>password</ControlLabel>
              <FormControl name="password"
              errorMessage={errors.passwordErrorValid? errors.passwordErrorValid:""}
              type={"password"}
              />
              
              <ControlLabel className={"form__edit-headline"}>Confirm password</ControlLabel>
              <FormControl name="confirmpassword"
              errorMessage={errors.confirmpasswordErrorValid? errors.confirmpasswordErrorValid:""}
              type={"password"}
              />
            </FormGroup>
            {error? <Message  className={'login-form__login-error'} type="error" description={error.message} />: false}
            <FormGroup>
              <ButtonToolbar>
                <Button className={"toolbar__button"} color={"green"}appearance="primary" onClick={formSumbit}>Save</Button>
                <Button className={"toolbar__button"} onClick={()=> dispatch(closeModal())}>Cancel</Button>
              </ButtonToolbar>
            </FormGroup>
          </Form>
    )

  }

  export default FormAdd;