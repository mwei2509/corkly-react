import axios from 'axios'

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
    


//account
export function getBoards(){
  let config = {
    headers: {token: window.localStorage.getItem("current user")}
  }
  return (dispatch) => {
    axios
      .get(`http://localhost:4000/account`, config)
      .then(({data}) => {
        dispatch({
          type: "LOAD_USER",
          data
        })
      })
      .catch((error)=>{
        debugger
      })
  }
}
