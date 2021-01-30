import React from 'react';
import { reduxForm, Field } from 'redux-form';


class FormInputs extends React.Component {


    // onSubmit = (FormValues)=>{
    //     console.log("ptops:",this.props);
    //     console.log("FromValues:",FormValues);
    //     this.props.onSubmit(FormValues);
    // }
    test={}
    constructor(props) {
        super(props);
       this.test =props.children;
        console.log("Form Input",props);
    }

    
    createInput=({input,type, children})=> {
        //console.log("value",input.value)
        return (
            <input placeholder={children} value={input.value} onChange={input.onChange}  type={type} />
        )
    }

    createTextArea(formProps) {
        return <textarea placeholder={formProps.children} onChange={formProps.input.onChange} value={formProps.input.value} />
    }
    createSelect(formProps) {
        return (<select id="Languge" placeholder={formProps.children} onChange={formProps.input.onChange}>
            <option value="">Lenguage</option>
            <option value="0">Hebrew</option>
            <option value="1">English</option>
        </select>)
    }



    onSubmit=(e)=>{
        this.props.onSubmit({Id:this.test?.Id,...e});
        this.props.reset();
    }

    renderInputs=()=>{
        
    }
    componentDidUpdate=()=>{
        this.test =this.props.children;
    //console.log("formInput props",this.props);
    }

    render() {
        console.log("render");
        console.log("child",this.test);
        return (
            <form id="createTestForm" className="ui form"
                onSubmit={this.props.handleSubmit(this.onSubmit)} method="post">
                <div className="field">
                    <label>Test Title</label>
                    <Field name="Title" component={this.createInput}>{this.test?.Title}</Field>
                </div>

                <div className="field">
                    <label>Lenguage</label>
                    <Field name="Language" component={this.createSelect}>{this.test?.Language}</Field>
                </div>
                <div className="field">
                    <label>Passing grade</label>
                    <Field name="PassingGrade" type="number" component={this.createInput}>{this.test?.PassingGrade}</Field>
                </div>

                <div className="field">
                    <label>Content</label>
                    <Field name="Content" component={this.createTextArea}>{this.test?.Content}</Field>
                </div>
                <div className="field">
                    <label>Email</label>
                    <Field name="email" type="email" component={this.createInput}>{this.test?.email}</Field>
                </div>
                <div className="two fields">
                    <div className="field">
                        <label>Success Message</label>
                        <Field name="SuccessMes" type="text" component={this.createInput}>{this.test?.SuccessMes}</Field>
                    </div>

                    <div className="field">
                        <label>Failure Message</label>
                        <Field name="FailureMes" type="text" component={this.createInput}>{this.test?.FailureMes}</Field>
                    </div>
                </div>
                    <div className="field">
                        <label>"Show answers on submit"</label>
                        <Field name="ShowAnswers" type="checkbox" component={this.createInput}>{this.test?.FailureMes}</Field>
                    </div>


                <input type="submit" />
            </form>
        )
    }
}

export default reduxForm({  form: 'TestCreate' })(FormInputs)
