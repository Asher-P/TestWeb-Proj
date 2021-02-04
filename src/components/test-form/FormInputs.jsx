import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { textChangeRangeIsUnchanged } from 'typescript';
import "./FormInputs.css";

const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Invalid email address' : undefined
const required = value => value ? undefined : 'Required';
const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength200 = maxLength(200);
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;

class FormInputs extends React.Component {


    // onSubmit = (FormValues)=>{
    //     console.log("ptops:",this.props);
    //     console.log("FromValues:",FormValues);
    //     this.props.onSubmit(FormValues);
    // }

    test = {}
    constructor(props) {
        super(props);
        this.test = props.children;
        console.log("Form inpur props", props);
        this.state = {
            Title: this.test?.Title,
            Language: this.test?.Language,
            PassingGrade: this.test?.PassingGrade,
            Content: this.test?.Content,
            email: this.test?.email,
            SuccessMes: this.test?.SuccessMes,
            FailureMes: this.test?.FailureMes,
            ShowAnswers: this.test?.ShowAnswers ? this.test.ShowAnswers : false,
        }
    }


    createInput = ({ input, type, children, meta: { touched, error } }) => {
        //console.log("value",input.value)
        return (
            <div>
                <input placeholder={children} value={children}
                    onChange={
                        (e) => {
                            children = e.target.value;
                            input.onChange(e);
                        }}
                    type={type} />
                <label className="error"> {touched && (error && <span>{error}</span>)}
                </label>
            </div>
        )
    }

    createTextArea(formProps) {
        return (
            <div>
                <textarea placeholder={formProps.children} onChange={formProps.input.onChange} value={formProps.children} />
                <label className="error">
                    {formProps.meta.touched && (formProps.meta.error && <span>{formProps.meta.error}</span>)}
                </label>
            </div>)
    }
    createSelect(formProps) {
        return (<select id="Languge" placeholder={formProps.children} onChange={formProps.input.onChange}>
            <option value="">Lenguage</option>
            <option value="0">Hebrew</option>
            <option value="1">English</option>
        </select>)
    }



    onSubmit = (e) => {
        e.preventDefault();
         console.log(e);
        let sendTest={
             Id:this.test?.Id,
             ...this.state,
         }
         console.log("test", sendTest);
         this.props.onSubmit(sendTest);
        //this.props.onSubmit({Id:this.test?.Id,...e});
        //this.props.reset();
    }

    renderInputs = () => {

    }


    render() {
        // console.log("render");
        // console.log("child",this.test);
        return (
            <form id="createTestForm" className="ui form"
                onSubmit={this.onSubmit} method="post">
                <div className="field">
                    <label>Test Title</label>
                    <input placeholder={this.test?.Title} value={this.state.Title}
                        onChange={(e) => this.setState({ Title: e.target?.value })}
                        type="text" />
                </div>

                <div className="field">
                    <label>Language</label>
                    <select id="Languge" placeholder={this.test?.Language}
                        onChange={(e) => this.setState({ Language: e.target.value })}>
                        <option value="">Lenguage</option>
                        <option value="0">Hebrew</option>
                        <option value="1">English</option>
                    </select>
                </div>
                <div className="field">
                    <label>Passing grade</label>
                    <input placeholder={this.test?.PassingGrade} value={this.state.PassingGrade}
                        onChange={(e) => this.setState({ PassingGrade: e.target.value })}
                        type="number" />
                </div>

                <div className="field">
                    <label>Content</label>
                    <textarea placeholder={this.test?.Content} value={this.state.Content}
                        onChange={(e) => this.setState({ Content: e.target.value })} />
                </div>
                <div className="field">
                    <label>Email</label>
                    <input placeholder={this.test?.email} value={this.state.email}
                        onChange={(e) => this.setState({ email: e.target.value })}
                        type="email" />
                </div>
                <div className="two fields">
                    <div className="field">
                        <label>Success Message</label>
                        <input placeholder={this.test?.SuccessMes} value={this.state.SuccessMes}
                            onChange={(e) => this.setState({ SuccessMes: e.target.value })}
                            type="text" />
                    </div>

                    <div className="field">
                        <label>Failure Message</label>
                        <input placeholder={this.test?.FailureMes} value={this.state.FailureMes}
                            onChange={(e) => this.setState({ FailureMes: e.target.value })}
                            type="text" />
                    </div>
                </div>
                <div className="field">
                    <label>"Show answers on submit"</label>
                    <input value={this.state.ShowAnswers}
                        onClick={(e) => this.setState({ShowAnswers:!this.state.ShowAnswers})}
                        // onChange={(e) =>this.setState({ ShowAnswers: e.target.value })}
                        type="checkbox" checked={this.state.ShowAnswers} />
                </div>


                <input type="submit" />
            </form>
        )
    }
}

export default FormInputs
