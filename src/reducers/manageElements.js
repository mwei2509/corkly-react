let defaultState={
    boardElements: [],
    accounts: [],
    boardId: null,
    created_at: null,
    updated_at: null,
    slug: '',
    url: '',
    public: false,
    title: ''}

export const manageElements = (state=defaultState, action) => {
  switch (action.type) {
    case "ADD_ELEMENT":
      return Object.assign({}, state, {boardElements: [...state.boardElements, action.payload]})
    case "UPDATE_ELEMENT":
      return Object.assign({}, state, {boardElements: state.boardElements.map((element) => {
        if(element.EID === action.payload.element.EID){
          return Object.assign({}, element, action.payload.element)
        } else {
          return element
        }
      })})
    case "SET_CURRENT_BOARD":
      return Object.assign({}, state, {
        boardId: action.data.id,
        boardElements: action.data.elements,
        title: action.data.title,
        slug: action.data.slug,
        url: action.data.url,
        public: action.data.public,
        accounts: action.data.accounts
     })
    case "ADD_BOARD":
       return Object.assign({}, state, {
         boardId: action.data.id,
         boardElements: action.data.elements,
         title: action.data.title,
         slug: action.data.slug,
         url: action.data.url,
         public: action.data.public,
         accounts: action.data.accounts
      })
    case "UPDATE_TITLE":
      return Object.assign({}, state, {title: action.payload})
    case "ASSIGN_TO_BOARD":
      return Object.assign({}, state, {boardId: action.payload})
    case "DELETE_BOARD":
      return defaultState
    case "DELETE_ELEMENT":
      return Object.assign({}, state, {boardElements: state.boardElements.filter(elm => elm.EID !== action.payload)})
    case "NEW_BOARD":
      return defaultState
    default:
      return state
  }
}
