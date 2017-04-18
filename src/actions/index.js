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

export const addOwner = (payload) => {
  return (dispatch) => {
    axios
    .post(`http://localhost:4000/boards/${payload.id}`, payload, config)
    .then(({data}) => {
      this
      debugger
    }).catch((error) => {
      this
      debugger
    })
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

//account
export function getBoards(){
  return (dispatch) => {
    axios
      .get(`http://localhost:4000/account`, config)
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
