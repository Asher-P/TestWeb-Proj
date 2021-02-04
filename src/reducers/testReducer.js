import TestsService from "../services/testsService";

const testsReducer = (state = [], action) => {
  //console.log(state);
  if (action.type === "FETCH_TEST") {
    return action.payload;
  }
  if (action.type === "FETCH_TESTS") {
    //console.log("payload:",action.payload)
    return action.payload;
  }

  return state;
};

export default testsReducer;
