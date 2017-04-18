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

export function deleteElement(id) {
  return {
    type: "DELETE_ELEMENT",
    payload: id
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
