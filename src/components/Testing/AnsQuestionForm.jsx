import { reduxForm, Field } from 'redux-form';
import React, { useState } from 'react'

const AnsQuestionForm = (props) => {
    const [answerValue, setanswerValue] = useState("")
    const createInput = (formProps) => {
        console.log(formProps);
        return (<input onChange={formProps.input.onChange} name="group1" type={formProps.type} value={formProps.children}></input>)
    }
    const onSubmit = (e) => {
        e.preventDefault();
        console.log("ans",e);
        props.onSubmit(answerValue);
        props.reset();
    }
   const answerChange= (e) => {
        setanswerValue(e.target.value);
    }
    return (
        <div className="AnsQuestionForm">
            <form className="ui form" onSubmit={onSubmit}>
                {props.children?.map((a, index) => {
                    return (
                        <div key={index} className="Field radio checkbox">
                            <div className="ui card">
                            <input onChange={answerChange} name="group1" type="radio" value={a.Content}></input>
                                {/*<Field name="answer" component={createInput} type="radio">{a.Content}</Field>*/}
                                <label>{a.Content}</label>
                            </div>
                        </div>)
                })}


                <div className="nextbtn">
                    <button type="submit">Next</button>
                </div>
            </form>
        </div>
    )
}


export default reduxForm({ form: 'QuestionAnswer' })(AnsQuestionForm)
