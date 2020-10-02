import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { loadUserFromStorage, showModal } from '../../actions/actions';
import * as urls from '../../urls';
import UsersTable from '../tables/UsersTable';
import { Container, Header, Content, Icon, IconButton, Button, InputGroup, Input} from 'rsuite';
import Sidebar from '../Sidebar';
import ModalAdmin from '../modals/UserModal';

const UsersPage = () => {
  const dispatch = useDispatch();
  const user =  useSelector(state => state.usersReducer.user);
  useEffect(() => {
    if(user && !user.name) {
      dispatch(loadUserFromStorage())
    }
  }, [user]);
  
  
  return (
    <div className="sidebar-page">
      <Container>
        <Sidebar/> 
        <Container>
            <Header>
              <h2>Users page</h2>
            </Header>
            <Content className={"content"}>
              <UsersTable/>
            </Content>
          </Container>
          <ModalAdmin/>
      </Container>
    </div>
  )
}







  export default UsersPage;


