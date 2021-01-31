

const currentQuestionReducer =  (state = null, action)=>{

    if(action.type ==="MOVE_QUESTION"){
        state = action.payload
    }
    
  return state;
}



export default currentQuestionReducer;