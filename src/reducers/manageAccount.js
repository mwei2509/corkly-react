export const manageAccount = (state={boards:[]}, action) => {
  switch (action.type) {
    case "LOAD_USER":
      return Object.assign({}, state, action.data)
    case "ADD_BOARD":
      return {...state, boards: state.boards.concat(action.data)}
    default:
      return state
  }
}
