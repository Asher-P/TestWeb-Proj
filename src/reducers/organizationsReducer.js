const organizationReducer = (state = [], action) => {
  if (action.type === "FETCH_ORGANIZATIONS") {
    return action.payload;
  }

  return state;
};

export default organizationReducer;
