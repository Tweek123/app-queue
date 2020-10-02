import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { loadUserFromStorage, redirect } from '../../actions/actions';
import * as urls from '../../urls';
import { Container, Header, Content} from 'rsuite';
import Sidebar from '../Sidebar';
import Chart from '../Chart';
import { useHistory } from 'react-router-dom';




const StatisticsPage = () => {
  const dispatch = useDispatch();
  const user =  useSelector(state => state.usersReducer.user);

  useEffect(() => {
    if(user && !user.name) {
      alert("123");
      // dispatch(loadUserFromStorage())
    }
  }, [user]);


    return (
      <div className="sidebar-page">
        <Container>
          <Sidebar/>  
          <Container>
            <Header>
              <h2>Statistics page</h2>
            </Header>
            <Content className={"content"}>
              <Chart/>
            </Content>
          </Container>
        </Container>
      </div>)
}

export default StatisticsPage;