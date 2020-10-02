import React from 'react';
import Navigation from './Navigation';
import { Sidebar, Sidenav, Icon } from 'rsuite';
import {useSelector} from 'react-redux'; 


const headerStyles = {
    padding: 18,
    fontSize: 16,
    height: 56,
    background: '#34c3ff',
    color: ' #fff',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  };

  const userStyles = {
    padding: 18,
    fontSize: 16,
    height: 56,
    background: 'white',
    color: "#575757",
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  };
  

const SidebarComponent = () => {
    const user = useSelector(state => state.usersReducer.user);
    return (
        <Sidebar
        style={{ display: 'flex', flexDirection: 'column' }}
        width={260}
        collapsible
      >
        <Sidenav.Header>
          <div style={headerStyles}>
            <Icon icon="logo-analytics" size="lg" style={{ verticalAlign: 0 }} />
            <span style={{ marginLeft: 12 }}>BREWAHOY</span>
          </div>
        </Sidenav.Header>
        <Sidenav
          defaultOpenKeys={['3']}
          appearance="subtle"
        >
          <Sidenav.Body>
                <div style={userStyles}>
                    <Icon icon="user" size="lg" style={{ verticalAlign: 0 }} />
                    <span style={{ marginLeft: 12 }}>{user.name}</span>
                </div>
                <Navigation/>
          </Sidenav.Body>
        </Sidenav>
      </Sidebar>
    )
}


export default SidebarComponent;

