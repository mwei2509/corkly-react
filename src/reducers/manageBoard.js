export const manageBoard = (state={boardElements: [{one: "foo"}, {two: "bar"}, {three: "Butts"}]}, action) => {
  switch (action.type) {
    case "CHANGE_POSITION":
      let newState = [...state.boardElements, action.newElement]
      return {baordElements: newState}
    default:
      return state
  }
}
