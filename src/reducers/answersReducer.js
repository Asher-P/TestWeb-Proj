export const answerReducer = (state = [], action) => {
  if (action.type === "ADD_ANSWER") {
    return [...state, action.payload];
  }
  return state;
};
