

const currentQuestionReducer =  (state = null, action)=>{
    if(action.type ==="FETCH_EXAM"){
      //console.log(action.payload);
      state = action.payload
     // console.log("state", state);
    }
    
  return state;
}



export default currentQuestionReducer;