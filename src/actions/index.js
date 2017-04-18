import axios from 'axios'


/////Board Elements
export const addBoardElement = (element) => {
  return {
    type: "ADD_ELEMENT",
    payload: element
  }
}

export const updateElementContent = (payload) => {
  return {
    type: "UPDATE_ELEMENT_CONTENT",
    payload: payload
  }
}

export const updateElementPosition = (payload) => {
  return {
    type: "UPDATE_ELEMENT_POSITION",
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
const config=
{
  headers:
  {token: window.localStorage.getItem("current user")}
}
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
      .post(`http://localhost:4000/boards`, {board: board}, config)
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
