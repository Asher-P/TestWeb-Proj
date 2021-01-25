import React from 'react';
import './QuestionBox.css'

const QuestionBox = (props) => {
    const question = props.question; 
    const renderQuestion=(tags)=>{
        let data = [];
        tags.map((t,index)=>data.push(<li key={"0"+index}>{t}||</li>));
        return data;
    }
    return (
        <div>
            <span><h3>{question.Title.substring(0,20)}</h3></span>
            <div>
                 <span><label>{question.QuestionBody.substring(0,20)}</label></span>
            </div>
            <div>
                <ul className="white">{renderQuestion(question.Tags)}</ul> 
            </div>
            
        </div>
    )
}

export default QuestionBox
