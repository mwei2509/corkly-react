import axios from 'axios'

const config=
{
  headers:
  {token: window.localStorage.getItem("current user")}
}

///// Board Stuff
export const setCurrentBoard = (id) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:4000/boards/${id}`, config)
      .then(({data}) => {
        dispatch({
          type: "SET_CURRENT_BOARD",
          data: data
        })
      })
      .catch((error)=>{
        debugger
      })
  }
}

export const newBoard = () => {
  return{
    type: "NEW_BOARD"
  }
}

/////Board Elements
export const addBoardElement = (element) => {
  return {
    type: "ADD_ELEMENT",
    payload: element
  }
}

export const updateElement = (payload) => {
  return {
    type: "UPDATE_ELEMENT",
    payload: payload
  }
}

export function deleteElement(EID) {
  return {
    type: "DELETE_ELEMENT",
    payload: EID
  }
}

export const updateTitle = (title) =>{
  return{
    type: "UPDATE_TITLE",
    payload: title
  }
}


//login

export const login = (username, password) => {
  return(dispatch)=>{
    axios
    .post('http://localhost:4000/login', {
      account: { username: username, password: password}
    })
    .then(({data}) => {
      window.localStorage.setItem("current user", data.jwt)
      dispatch({
        type: 'LOGIN',
        payload: data.jwt
      })
    })
    .catch((errors) => {
      debugger
    })
  }
}

export const register = (username, email, password) => {
  return(dispatch)=>{
    axios
    .post('http://localhost:4000/register', {
      account: { username: username, email: email, password: password}
    })
    .then(({data})=>{
      window.localStorage.setItem("current user", data.jwt)
      dispatch({
        type: 'LOGIN',
        payload: data.jwt
      })
    })
    .catch((errors)=>{
      debugger
    })
  }
}

export const logout = (token) => {
  console.log("hi")
  window.localStorage.removeItem("current user")
  return{
    type: "LOGOUT"
  }
}

//account
export const clearUser = () =>{
  return{
    type: "CLEAR_USER"
  }
}

export function setUser(token){
  let config={
    headers: {token: token}
  }
  return (dispatch) => {
    axios
      .get(`http://localhost:4000/account`,
        {headers: {token: token}})
      .then(({data}) => {
        dispatch({
          type: "LOAD_USER",
          data: data
        })
      })
      .catch((error)=>{
        debugger
      })
  }
}

export function createBoard(board){
  return (dispatch) => {
    axios
      .post(`http://localhost:4000/boards`, board, config)
      .then(({data}) => {
        dispatch({
          type: "ADD_BOARD",
          data: data
        })
      })
      .catch((error)=>{
        debugger
      })
  }
}

export const updateBoard = (payload) => {
  return (dispatch) => {
    axios
    .patch(`http://localhost:4000/boards/${payload.board.id}`, payload, config)
    .then(({data}) => {
      dispatch({
        type: "SET_CURRENT_BOARD",
        data: data
      })
    }).catch((error) => {
      debugger
    })
  }
}
