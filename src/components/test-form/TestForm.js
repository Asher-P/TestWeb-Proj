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

            <form className="ui form">
                <div className="filed">
                    <label>Test Title</label>
                    <input type="text" placeholder="Title"></input>
                </div>

                <div className="filed">
                    <label>Language</label>
                    <select>
                        <option value="">Lenguge</option>
                        <option value="0">Hebrew</option>
                        <option value="1">English</option>
                    </select>
                </div>
                <div className="filed">
                    <label>Passing grade</label>
                    <input type="number" />
                </div>

                <div className="filed">
                    <label>Content</label>
                    <textarea></textarea>
                </div>

                <div className="filed">
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
            </form>

        </div>
    )
}

export default TestForm
