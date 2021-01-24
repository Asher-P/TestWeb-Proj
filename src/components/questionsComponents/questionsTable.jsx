import React,{ Component } from "react";


class QuestionsTable extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = { questions: this.props.questions }
    }
    questionsTableData() {
        return this.state.questions.map((question) => {
           const { Id, Title, QuestionBody } = question
           return (
              <tr key={Id}>
                 <td>{Id}</td>
                 <td>{Title}</td>
                 <td>{QuestionBody}</td>
              </tr>
           )
        })
     }
    render() { 
        return ( 
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Content</th>
                  </tr>
                </thead>
                <tbody>
                    {this.questionsTableData()}
                </tbody>
              </table>
            </div>
         );
    }
}
 
export default QuestionsTable;
  