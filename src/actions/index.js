import axios from 'axios'
import {CorklyApi} from '../components/constants'

export function createBoard(token, board){
  return (dispatch) => {
    axios
      .post(`${CorklyApi}/boards`, board, {
        headers:
        {token: token}
      })
      .then(({data}) => {
        dispatch({
          type: "ADD_BOARD",
          data: data
        })
      })
      .catch((errors)=>{
        console.log(errors)
      })
  }
}

export const deleteBoard = (token, payload) => {
  return (dispatch) => {
  axios
    .delete(`${CorklyApi}/boards/${payload.id}`, {
      headers:
      {token: token}
    })
    .then(({data}) => {
      dispatch({
        type: "DELETE_BOARD",
        payload: data
      })
    }).catch((errors) => {
      dispatch({
        type: "ADD_ERROR",
        payload: "Problem deleting board"
      })
      setTimeout(()=>{dispatch({
        type: "ADD_ERROR",
        payload: ""
      })}, 2000)
    })
  }
}

export const updateBoard = (token, payload) => {
  return (dispatch) => {
    axios
    .patch(`${CorklyApi}/boards/${payload.board.id}`, payload, {
      headers:
      {token: token}
    })
    .then(({data}) => {
      dispatch({
        type: "ADD_ERROR",
        payload: "Saved Board"
      })
      setTimeout(()=>{dispatch({
        type: "ADD_ERROR",
        payload: ""
      })}, 2000)
      dispatch({
        type: "SET_CURRENT_BOARD",
        data: data
      })
    }).catch((errors) => {
      dispatch({
        type: "ADD_ERROR",
        payload: errors.response.data.error
      })
      setTimeout(()=>{dispatch({
        type: "ADD_ERROR",
        payload: ""
      })}, 2000)
    })
  }
}

export const changeBoardColor =(token, payload) => {
  return (dispatch) => {
    axios
    .patch(`http://localhost:4000/boards/${payload.board.id}`, payload, {
      headers:
      {token: token}
    })
    .then(({data}) => {
      dispatch({
        type: "SET_CURRENT_BOARD",
        data: data
      })
    }).catch((errors) => {
      dispatch({
        type: "ADD_ERROR",
        payload: errors.response.data.error
      })
      setTimeout(()=>{dispatch({
        type: "ADD_ERROR",
        payload: ""
      })}, 2000)
    })
  }
}

export const setCurrentBoard = (token, id) => {
  return (dispatch) => {
    axios
      .get(`${CorklyApi}/boards/${id}`, {
        headers:
        {token: token}
      })
      .then(({data}) => {
        dispatch({
          type: "SET_CURRENT_BOARD",
          data: data
        })
      })
      .catch((errors)=>{
        dispatch ({
          type: "ADD_ERROR",
          payload: "Unable to access"
        })
        setTimeout(()=>{dispatch({
          type: "ADD_ERROR",
          payload: ""
        })}, 2000)
      })
  }
}

export const setPublicBoard = (token, slug) => {
  return (dispatch) => {
    axios
      .get(`${CorklyApi}/boards/slug/${slug}`, {
        headers:
        {token: token}
      })
      .then(({data}) => {
        dispatch({
          type: "SET_CURRENT_BOARD",
          data: data
        })
      })
      .catch((errors)=>{
        dispatch ({
          type: "ADD_ERROR",
          payload: "Unable to access"
        })
        setTimeout(()=>{dispatch({
          type: "ADD_ERROR",
          payload: ""
        })}, 2000)
      })
  }
}

export const addError = (error) => {
  return{
    type: "ADD_ERROR",
    payload: error
  }
}

export const newBoard = () => {
  return{
    type: "NEW_BOARD"
      }
}

export function addCollaborator(token, payload){
  return (dispatch) => {
    axios
    .post(`${CorklyApi}/boards/${payload.id}`, payload, {
      headers:
      {token: token}
    })
    .then(({data}) => {
      dispatch({
        type: "ADD_ERROR",
        payload: "Added Collaborator"
      })
      setTimeout(()=>{dispatch({
        type: "ADD_ERROR",
        payload: ""
      })}, 2000)
      dispatch({
        type: "SET_CURRENT_BOARD",
        data: data
      })
    }).catch((errors) => {
      debugger
    })
  }
}

export function publish(token, {board}){
  return (dispatch) => {
    axios
    .patch(`${CorklyApi}/boards/${board.id}/publish`, board, {
      headers:
      {token: token}
    })
    .then(({data}) => {
      dispatch({
        type: "SET_CURRENT_BOARD",
        data: data
      })
    }).catch((errors) => {
      debugger
    })
  }
}

////Board attributes like current color

export const changeBoardAttributes = (attributes) => {
  return{
    type: "CHANGE_BOARD_ATTRIBUTES",
    payload: attributes
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
    .post(`${CorklyApi}/login`, {
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
      dispatch({
        type: "ADD_ERROR",
        payload: errors.response.data.error
      })
      setTimeout(()=>{dispatch({
        type: "ADD_ERROR",
        payload: ""
      })}, 2000)
    })
  }
}

export const register = (username, email, password) => {
  return(dispatch)=>{
    axios
    .post(`${CorklyApi}/register`, {
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
      let builderror
      if(!!errors.response.data.errors.username){
        builderror="Username " + errors.response.data.errors.username
      } else if(!!errors.response.data.errors.email){
        builderror="Email " + errors.response.data.errors.email
      }
      dispatch({
        type: "ADD_ERROR",
        payload: builderror
      })
      setTimeout(()=>{dispatch({
        type: "ADD_ERROR",
        payload: ""
      })}, 2000)
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
  return (dispatch) => {
    axios
      .get(`${CorklyApi}/account`,
        {headers: {token: token}})
      .then(({data}) => {
        dispatch({
          type: "LOAD_USER",
          data: data
        })
      })
      .catch((errors)=>{
        dispatch({
          type: "ADD_ERROR",
          payload: errors.response.data.error
        })
        setTimeout(()=>{dispatch({
          type: "ADD_ERROR",
          payload: ""
        })}, 2000)
      })
  }
}
