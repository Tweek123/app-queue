import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Table, InputGroup, Icon,  Input, Button } from 'rsuite';
import { getUsers, showModal } from '../../actions/actions';


const { Column, HeaderCell, Cell } = Table;
const FixedColumnTable = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.usersReducer.users);
    const [filterUsers, setFilterUsers] = useState(users);
    useEffect(() => {
      if(!users || !users.length) {
        dispatch(getUsers())
      }
      setFilterUsers(users);
    }, [users]);
      return (
        <div>
          <div className={"table__header"}>
            <InputGroup className={"table__header-search"}>
              <Input onChange={(value) => {
                  const findedUsers = users.filter(user => 
                     user.username.includes(value) ||
                   user.first_name.includes(value) ||
                    user.last_name.includes(value) ||
                     user.email.includes(value));
                  setFilterUsers(findedUsers);
              }}/>
              <InputGroup.Addon>
              <Icon icon="search" />
              </InputGroup.Addon>
            </InputGroup>
            <Button appearance="primary" 
                className={"table__header-add-user"} 
                size="sm"
                onClick={() => dispatch(showModal(null, "ADD"))}>
                  Add user
            </Button>
          </div>
          <Table
            data={filterUsers}
            virtualized
            height={400}
          >
          <Column width={120} align="center" fixed>
            <HeaderCell>id</HeaderCell>
            <Cell dataKey="id" />
          </Column>

          <Column width={120} align="center" fixed>
            <HeaderCell>Username</HeaderCell>
            <Cell dataKey="username" />
          </Column>

          <Column width={70} align="center">
            <HeaderCell>Admin</HeaderCell>
            <Cell dataKey="admin"/>
          </Column>

          <Column width={120} align="center">
            <HeaderCell>First name</HeaderCell>
            <Cell dataKey="first_name"/>
          </Column>

          <Column width={120} align="center">
            <HeaderCell>Last name</HeaderCell>
            <Cell dataKey="last_name"/>
          </Column>

          <Column width={220} align="center">
            <HeaderCell>Email</HeaderCell>
            <Cell dataKey="email"/>
          </Column>

          <Column width={120} fixed="right">
            <HeaderCell>Action</HeaderCell>

            <Cell>
              {rowData => {
                function editUser() {
                  dispatch(showModal(rowData, "EDIT"))
                }

                function deleteUser() {
                  dispatch(showModal(rowData, "DELETE"))
                }
                return (
                  <span>
                    <a onClick={editUser}> Edit </a> |{' '}
                    <a onClick={deleteUser}> Remove </a>
                  </span>
                );
              }}
            </Cell>
          </Column>
          </Table>
        </div>
      );
  }

  export default FixedColumnTable;