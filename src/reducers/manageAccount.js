export const manageAccount = (state={boards:[], username: '', email: '', id: ''}, action) => {
  switch (action.type) {
    case "LOAD_USER":
      return Object.assign({}, state, action.data)
    case "SET_CURRENT_BOARD":
      return Object.assign({}, state, {updated_at: action.data.updated_at})
    case "CLEAR_USER":
      return {boards:[], username: '', email: '', id: ''}
    case "ADD_BOARD":
      return {...state, boards: state.boards.concat(action.data)}
    case "DELETE_BOARD":
      return {...state, boards: state.boards.filter(board => board.id !== action.payload)}
    default:
      return state
  }
}
