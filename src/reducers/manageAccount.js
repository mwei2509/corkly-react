export const manageAccount = (state={boards:[], username: '', email: '', id: ''}, action) => {
  switch (action.type) {
    case "LOAD_USER":
      return Object.assign({}, state, action.data)
    case "CLEAR_USER":
      return {boards:[], username: '', email: '', id: ''}
    case "ADD_BOARD":
      return {...state, boards: state.boards.concat(action.data)}
    default:
      return state
  }
}
