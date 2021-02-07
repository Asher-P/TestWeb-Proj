import React from "react";
import {Link} from "react-router-dom";

class ReportsByStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentName: "",
      exams: this.props.exams,
    };
  }
  render() {
    return (
    <div className="ReportsByStudent">
      <div>
        <label>Search Student</label>
        <input type="text" onChange={(e)=>this.setState({studentName:e.target.value})} />
      </div>
      <table>
        <thead>
          <tr>
            <td>Student Name</td>
            <td>Test title</td>
            <td>exam link</td>
          </tr>
        </thead>
        <tbody>
          {this.props.exams?.filter(e=>e.student.studentName === this.state.studentName).map(e=>{
            return (<tr>
              <td>{e.student.studentName}</td>
              <td>{e.test.Title}</td>
              <td><Link className="ui inverted primary button" 
                    to={
                        {
                            pathname: `/showanswers?id=${e.Id}`,
                        }
                    }
                    target="_blank"
                    >Show my Answers</Link></td>
              </tr>
              )
          })}
        </tbody>
      </table>

    </div>
      )
  }
}


export default ReportsByStudent;
