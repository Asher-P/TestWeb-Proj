import React from 'react';
import './TestForm.css';

function ColorRow(e){
    if(e.target.parentNode.tagName == "TR")
    {
        console.log(e.target.parentNode.classList.contains("green"))
        if(e.target.parentNode.classList.contains("green")){
            e.target.parentNode.classList.remove("green");
            /*console.log("disable")*/
        }
        else{
            e.target.parentNode.classList.add("green");
            /*console.log("enable")*/
        }
    }
}

function handleSubmit(e){
    e.preventDefault();
    console.log("e",e);
}

function TestForm(props) {
   const questions=props.questions;
   const dataTable = [];
   questions.map((question,index) => {
    dataTable.push(<tr key={question.Id} data-item={question} onClick={ColorRow} >
        <td>{index}</td>
        <td>{question.Id}</td>
        <td>{question.Title}</td>
    </tr>)
})
    console.log(props);
    console.log(questions);
    return (
        <div className="TestForm">

            <form className="ui form" submit="handleSubmit" method="post">
                <div className="field">
                    <label>Test Title</label>
                    <input id="Title" type="text" placeholder="Title"></input>
                </div>

                <div className="field">
                    <label>Language</label>
                    <select id="Lenguge">
                        <option value="">Lenguge</option>
                        <option value="0">Hebrew</option>
                        <option value="1">English</option>
                    </select>
                </div>
                <div className="field">
                    <label>Passing grade</label>
                    <input id="PassingGrade" type="number" />
                </div>

                <div className="field">
                    <label>Content</label>
                    <textarea id="Content"></textarea>
                </div>
                <div className="field">
                    <label>Email</label>
                    <input id="email" type="email"></input>
                </div>
                <div className="two fields">
                    <div className="field">
                    <label>Success Message</label>
                    <input id="SuccessMes" type="text"></input>
                    </div>
                    <div className="field">
                    <label>Failure Message</label>
                    <input id="FailureMes" type="text"></input>
                    </div>
                </div>

                <div className="field">
                    <label>Chose questions</label>
                    <table className="ui celled table">
                        <thead>
                                <tr>
                                    <th>#</th>
                                    <th>ID</th>
                                    <th>Content</th>
                                </tr>
                            </thead>
                        <tbody>
                            {dataTable}
                        </tbody>
                    </table>
                </div>
                <input type="submit"/>
            </form>

        </div>
    )
}

export default TestForm
