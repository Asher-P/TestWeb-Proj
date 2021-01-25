import React from 'react';
const QuestionBox = (props) => {
    const question = props.question; 
    console.log(question);
    return (
        <div>
            <span><h3>{question.Title.substring(0,20)}</h3></span>
            <div>
                {/* <span><label>{question.content.substring(0,20)}</label></span> */}
            </div>
            <div>
                <span><label>{question.tags}</label></span>
            </div>
            
        </div>
    )
}

export default QuestionBox
