export const manageLogin = (state={token: window.localStorage.getItem("current user")}, action) => {
  switch (action.type) {
    case "LOGIN":
      return {token: action.payload}
    case "LOGOUT":
      return {token: ''}
    default:
      return state
  }
}
