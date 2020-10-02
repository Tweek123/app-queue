import React from 'react';
import {useSelector, useDispatch} from 'react-redux'; 
import * as urls from '../urls';
import {redirect, logout} from '../actions/actions'
import { Nav, Icon } from 'rsuite';

const Navigation = () => {
    const user = useSelector(state => state.usersReducer.user);
    const dispatch = useDispatch();

    if(user.url === urls.statisticsPage) { 
        return (            
            <Nav>
                {user.admin?
                    <a href={urls.adminPage}>
                        <Nav.Item
                        eventKey="1" icon={<Icon icon="id-card" />}>
                            Django admin
                        </Nav.Item>
                    </a>
                : false}
                 
                
                {user.admin? 
                    <Nav.Item onClick= {() => 
                    dispatch(redirect(urls.usersPage))} 
                    eventKey="2" icon={<Icon icon="group" />}>
                        Users
                    </Nav.Item>
                : false}

                <Nav.Item
                    onClick={() => {
                        dispatch(logout());
                    }} 
                    eventKey="3" 
                    icon={<Icon icon="sign-out" />}>
                     Sign out
                </Nav.Item>
            </Nav>
          )
    }

      if(user.url === urls.usersPage) { 
        return (            
            <Nav>
                {user.admin?
                    <a href={urls.adminPage}>
                        <Nav.Item
                        eventKey="1" icon={<Icon icon="id-card" />}>
                            Django admin
                        </Nav.Item>
                    </a>
                : false}
                  
                {user.admin? 
                    <Nav.Item onClick= {() => dispatch(redirect(urls.usersPage))} 
                    eventKey="2" icon={<Icon icon="group" />}>
                        Users
                    </Nav.Item>: false}

                    <Nav.Item onClick= {() => dispatch(redirect(urls.statisticsPage))} 
                    eventKey="3" icon={<Icon icon="group" />}>
                        Statistics
                    </Nav.Item>
                
                    <Nav.Item 
                        onClick={() => {
                            dispatch(logout());
                        }}
                        eventKey="4" 
                        icon={<Icon icon="sign-out" />}>
                        Sign out
                    </Nav.Item>
            </Nav>
          )
      }

      return false
}

export default Navigation;