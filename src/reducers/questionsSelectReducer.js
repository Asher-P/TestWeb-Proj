const questionsSelectReducer = (state=[], action) => {
    if (action.type === "SELECT_QUESTIONS"){
       let qFind= state.find(q=>q.Id === action.payload.Id);
        if(!qFind){
        return [...state, action.payload];
    }
     else if(qFind)
         return state.filter(q=>q.Id!== action.payload.Id)
}

return state;
}



export default questionsSelectReducer;