import React from "react";

class ReportsByStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentName: "",
    };
  }
  render() {
    return (
    <div className="ReportsByStudent">
      <div>
        <label>Search Student</label>
        <input type="text" onChange={(e)=>this.setState({studentName:e.target.value})} />
      </div>

    </div>
      )
  }
}


export default ReportsByStudent;
