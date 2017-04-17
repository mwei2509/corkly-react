export const manageBoard = (state={boardElements: []}, action) => {
  switch (action.type) {
    case "ADD_ELEMENT":
      return Object.assign({}, state, {boardElements: [...state.boardElements, action.payload]})
    case "CHANGE_POSITION":
      let newState = [...state.boardElements, action.newElement]
      return {baordElements: newState}
    default:
      return state
  }
}
