import axios from 'axios'

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
