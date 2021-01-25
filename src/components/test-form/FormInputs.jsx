import React from 'react';
import { reduxForm, Field } from 'redux-form';


class FormInputs extends React.Component {


    // onSubmit = (FormValues)=>{
    //     console.log("ptops:",this.props);
    //     console.log("FromValues:",FormValues);
    //     this.props.onSubmit(FormValues);
    // }
    constructor(props) {
        super(props);
        console.log("props:", props);
    }
    createInput(formProps) {

        return (
            <input {...formProps.input} type={formProps.type} />
        )
    }

    createTextArea(formProps) {
        return <textarea onChange={formProps.input.onChange} value={formProps.input.value} />
    }
    createSelect(formProps) {
        return (<select id="Lenguge" onChange={formProps.input.onChange}>
            <option value="">Lenguage</option>
            <option value="0">Hebrew</option>
            <option value="1">English</option>
        </select>)
    }

    onSubmit=(e)=>{
        this.props.onSubmit(e);
        this.props.reset();
    }

    render() {
        return (
            <form id="createTestForm" className="ui form"
                onSubmit={this.props.handleSubmit(this.onSubmit)} method="post">
                <div className="field">
                    <label>Test Title</label>
                    <Field name="Title" component={this.createInput} />
                </div>

                <div className="field">
                    <label>Language</label>
                    <Field name="Language" component={this.createSelect} />
                </div>
                <div className="field">
                    <label>Passing grade</label>
                    <Field name="PassingGrade" type="number" component={this.createInput} />
                </div>

                <div className="field">
                    <label>Content</label>
                    <Field name="Content" component={this.createTextArea} />
                </div>
                <div className="field">
                    <label>Email</label>
                    <Field name="email" type="email" component={this.createInput} />
                </div>
                <div className=" fields">
                    <div className="field">
                        <label>Success Message</label>
                        <Field name="SuccessMes" type="text" component={this.createInput} />
                    </div>

                    <div className="field">
                        <label>Failure Message</label>
                        <Field name="FailureMes" type="text" component={this.createInput} />
                    </div>
                </div>


                <input type="submit" />
            </form>
        )
    }
}

export default reduxForm({ form: 'TestCreate' })(FormInputs)
