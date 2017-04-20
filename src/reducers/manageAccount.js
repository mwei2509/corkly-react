export const manageAccount = (state={boards:[], username: '', email: '', id: ''}, action) => {
  switch (action.type) {
    case "LOAD_USER":
      return Object.assign({}, state, action.data)
    case "SET_CURRENT_BOARD":
      return Object.assign({}, state, {update_me: action.data.update_me})
    case "CLEAR_USER":
      return {boards:[], username: '', email: '', id: ''}
    case "ADD_BOARD":
      // return {...state, boards: state.boards.concat(action.data)}
      return Object.assign({}, state, {boards: state.boards.concat(action.data), updated_at: action.data.updated_at})
    case "DELETE_BOARD":
      return {...state, boards: state.boards.filter(board => board.id !== action.payload)}
    default:
      return state
  }
}
