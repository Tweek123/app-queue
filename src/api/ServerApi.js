import "regenerator-runtime/runtime";
import * as urls from '../urls';


export function fetchGetClientData(data) {
    console.log(data);
    return fetch(urls.getClientData, {
     method: 'POST',
     mode: 'cors',
     cache: 'no-cache',
     credentials: 'same-origin', 
     headers: {
       'Content-Type': 'application/json'
       
     },
     redirect: 'follow', 
     referrerPolicy: 'no-referrer', 
     body: JSON.stringify(
        {
          id: data.id,
          timeStart: data.range[0],
          timeEnd: data.range[1],
          changeInterval: data.changeInterval
        })
     })
     .then(res => { 
      if(!res.ok)  {
        throw {status: res.status, 
          message: "Server Error"};

      }
      return res.json()
    })
 }

 export function fetchAuthUser(data) {
     return fetch(urls.authUser, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
          
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data) 
      })
      .then(res => {
        if (res.status === 401) {
          throw {status: res.status,
            message: 'Wrong username or password'}
        }
        
        if(!res.ok) {
          throw {status: res.status,
            message: 'Server error'};
        }

        return res.json()
      })
 }

 export function fetchAddUser(data) {
  return fetch(urls.addUser, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    })
    .then(res => {
      if(res.status === 409) {
        throw {status: res.status,
          message: 'This login arledy exist'};
      }

      if(!res.ok) {
        throw {status: res.status,
          message: 'Server error'};
      }
    }) 
}

 export function fetchChangeUser(data) {
    return fetch(urls.changeUser, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data) 
    })
    .then(res => {
      if(res.status === 409) {
        throw {status: res.status,
          message: 'This login arledy exist'};
      }

      if(!res.ok) {
        throw {status: res.status,
          message: 'Server error'};
      } 
    }) 
 }


 
 export function fetchRemoveUser(data) {
  return fetch(urls.removeUser, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  }).then(res => {
    if(!res.ok) {
      throw {status: res.status,
        message: 'Server error'};
    } 
  })
 }


 export function fetchGetUsers() {
  return fetch(urls.getUsers, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  }).then(res => {
    if(!res.ok) {
      throw {status: res.status,
        message: 'Server error'};
    }
    
    return res.json();
  })
 }


 export function fetchGetClients() {
  return fetch(urls.getClients, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  }).then(res => {
    if(!res.ok) {
      throw {status: res.status,
        message: 'Server error'
      };
    }
    
    return res.json();
  })
 }

 