export const manageBoard = (state={}, action) => {
  switch (action.type) {
    case "CHANGE_BOARD_ATTRIBUTES":
      return Object.assign({}, state, action.payload)
    case "ADD_ERROR":
      return Object.assign({}, state, {error: action.payload})
    default:
      return state
  }
}
