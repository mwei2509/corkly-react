import axios from 'axios'

export const addBoardElement = (element) => {
  return {
    type: "ADD_ELEMENT",
    payload: element
  }
}


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
