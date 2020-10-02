import React, {useEffect} from 'react';
import { Container, FlexboxGrid, Content} from 'rsuite';
import FormLogin from "../forms/FormLogin"
import {useDispatch, useSelector} from 'react-redux';
import { loadUserFromStorage } from '../../actions/actions';

const HomePage = () => {
  const user =  useSelector(state => state.usersReducer.user);
  const dispatch = useDispatch();
  
  
  useEffect(() => {
    if(user && !user.name) {
      dispatch(loadUserFromStorage())
    }
  }, [user]);


  return(
    <div className="show-fake-browser login-page"> 
        <Container>
          <Content>
            <FlexboxGrid justify="center">
              <FlexboxGrid.Item colspan={12}>
                <FormLogin/>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </Content>
      </Container>
    </div>

  )
}

export default HomePage;

