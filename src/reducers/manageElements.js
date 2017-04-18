export const manageElements = (state={boardElements: [], boardId: null}, action) => {
  switch (action.type) {
    case "ADD_ELEMENT":
      return Object.assign({}, state, {boardElements: [...state.boardElements, action.payload]})
    case "UPDATE_ELEMENT":
      return Object.assign({}, state, {boardElements: state.boardElements.map((element) => {
        if(element.id === action.payload.element.id){
          return Object.assign({}, element, action.payload.element)
        } else {
          return element
        }
      })})
    case "ASSIGN_TO_BOARD":
      return Object.assign({}, state, {boardId: action.payload})
    // case "CHANGE_POSITION":
    //   let newState = [...state.boardElements, action.newElement]
    //   return {baordElements: newState}
    default:
      return state
  }
}
