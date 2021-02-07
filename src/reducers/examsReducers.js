const examsReducer = (state = [], action) => {
    if (action.type === "FETCH_EXAMS") {
      return action.payload;
    }
     return state;
};

export default examsReducer;