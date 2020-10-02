import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {InputPicker} from "rsuite";
import {getClients, selectClient} from "../actions/actions";

const Clients = () =>  {
    const dispatch = useDispatch();
    const clients = useSelector(state => state.clientsReducer.clients);
    const client = useSelector(state => state.clientsReducer.client);
    
    const clientsPicker = clients.map((client) => {
        return   {
            label: `${client.name}`,
            value: `${client.id}`
          };
    })

    useEffect(() => {
        if(!clients || !clients.length) {
            dispatch(getClients())
        }
      }, [clients]);
    

    if(clients.length) {
        return <InputPicker
            cleanable={false} 
            className={"clients__picker"}
            onChange={(id)=> {dispatch(selectClient(id))}}
            data={clientsPicker} style={{ width: 224 }}
            defaultValue={`${client.id}`}
        />
    } else {
        return false
    }

};

export default Clients;