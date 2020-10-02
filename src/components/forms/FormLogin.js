import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authorization } from "../../actions/actions";
import { Container,  Message, Panel, Form, FormGroup, ControlLabel, FormControl, ButtonToolbar, Button,FlexboxGrid, Content} from 'rsuite';

const FormLogin = () => {
    const [form, setForm] = useState({})
    const dispatch = useDispatch();
    const error = useSelector(state => state.usersReducer.errors.authError);

    return(
        <Panel header={<h3>Login</h3>} bordered>
          <Form fluid         
          onChange={form => {
            setForm(form);
          }}>
            {error && error.status === 500 ?<Message  className={'login-form__login-error'} type="error" description={error.message} />: false}
            <FormGroup>
              <ControlLabel>Username</ControlLabel>
              <FormControl name="login"/>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Password</ControlLabel>
              <FormControl name="password" type="password"/>
            </FormGroup>
            {error && error.status === 401 ? <Message  className={'login-form__login-error'} type="error" description={error.message} />: false}
            <FormGroup>
              <ButtonToolbar>
                <Button appearance="primary" onClick={() => dispatch(authorization(form))}>Sign in</Button>
              </ButtonToolbar>
            </FormGroup>
          </Form>
        </Panel>
    )
  }

  export default FormLogin;