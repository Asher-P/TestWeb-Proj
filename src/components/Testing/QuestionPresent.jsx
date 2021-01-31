import React from 'react';
import AnsQuestionForm from './AnsQuestionForm';
import './QuestionPresent.css';

class QuestionPresent extends React.Component {
    constructor(props)
    {
        super(props);
    }
    onSubmit=(answer)=>{
        this.props.onSubmit(answer);
    }
    render() {
        return (
            <div className="QuestionPresent">
                    <div className="ui card">
                        <label>{this.props.question?.Title}</label>
                    </div>
                    <div>
                        <h5 className="blue">{this.props.question?.Tags?.map(t=>t+"||")}</h5>
                    </div>
                    <div className="ui attached segment">
                       <h2> {this.props.question?.QuestionBody}</h2>
                    </div>
                    <div className="ui attached segment">
                        <h4>{this.props.question?.ExtraInfo}</h4>
                    </div>
                    <div>
                        <AnsQuestionForm onSubmit={this.onSubmit}>{this.props.question?.Answers}</AnsQuestionForm>
                    </div>
            </div>
        )
    }
}

export default QuestionPresent; 
