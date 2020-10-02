
export const authorization = (loginForm) => ({type: "AUTH_USER", loginForm});
export const redirect = (url) => ({type: "USER_REDIRECT", url});
export const loginerr = (error) => ({type: "LOGIN_ERROR", error});
export const logout = () => ({type: "LOGOUT"});
export const setUser = (user) => ({type: "SET_USER", user})

export const getClientData = (params) => ({ type: "GET_CLIENT_DATA", params});
export const loadClientData = (clientData) => ({type: "LOAD_CLIENT_DATA", clientData});
export const loadClientDataError = (error) => ({type: "LOAD_CLIENT_DATA_ERROR", error})

export const getUsersData = () => ({type: "GET_USERS_DATA"});
export const loadUsersData = () => ({type: "LOAD_USERS_DATA"});
export const openModalUser = (data) => ({type: "OPEN_MODAL_USER", data})
export const closeModalUser = () => ({type: "CLOSE_MODAL_USER"})


export const removeUser = (id) => ({type: "REMOVE_USER", id})
export const unloadUser = (id) => ({type: "UNLOAD_USER", id})
export const removeUserError = (error) => ({ type: 'REMOVE_USER_ERROR', error})


export const refreshUsers = () => ({ type: "REFRESH_USERS"});


export const addUser = (addUserForm) => ({type: "ADD_USER", addUserForm})
export const uploadUser = (user) => ({type: "UPLOAD_USER", user})
export const addUserError = (error) => ({ type: "ADD_USER_ERROR", error})


export const changeUserData = (changeUserForm) => ({type: "CHANGE_USER", changeUserForm})
export const refreshUser = (user) => ({ type: 'REFRESH_USER', user})
export const changeUserError = (error) => ({ type: 'CHANGE_USER_ERROR', error})


export const getUsers = () => ({type: 'GET_USERS'})
export const loadUsers =  (users) => ({type: 'UPLOAD_USERS'}, users)
export const getUsersError = (error) => ({type: 'GET_USERS_ERROR', error})

export const getClients = () => ({type: 'GET_CLIENTS'});
export const loadClients = (clients) => ({type: 'UPLOAD_CLIENTS'}, clients);
export const getClientsError = (error) => ({type: 'GET_CLIENTS', error})

export const selectClient = (id) => ({type: 'SELECT_CLIENT', id})
export const loadUserFromStorage = () => ({type: 'LOAD_USER_FROM_STORAGE'})

export const changeInterval = (change) => ({type: 'CHANGE_INTERVAL', change})
export const changeRange = (range) => ({type: 'CHANGE_RANGE', range})


export const showModal = (form, formType) => ({type: 'OPEN_MODAL', form, formType})
export const closeModal = () => ({type: 'CLOSE_MODAL'})

export const resetClientErrors = (errors) => ({type: 'RESET_CLIENTS_ERRORS', errors})
export const resetUsersErrors = (errors) => ({type: 'RESET_USERS_ERRORS', errors})