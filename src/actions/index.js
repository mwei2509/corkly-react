export const addBoardElement = (element) => {
  return {
    type: "ADD_ELEMENT",
    payload: element
  }
}

export const updateElementContent = (payload) => {
  return {
    type: "UPDATE_ELEMENT_CONTENT",
    payload: payload
  }
}

export const updateElementPosition = (payload) => {
  return {
    type: "UPDATE_ELEMENT_POSITION",
    payload: payload
  }
}
