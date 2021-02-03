import React, { Component } from "react";
import QuestionBox from "../question-box-component/QuestionBox";
import Popup from "../popup-component/Popup";
import { connect } from "react-redux";
import { selectQuestions, fetchQuestions } from "../../actions";
import { Link } from "react-router-dom";

class QuestionsTable extends Component {
  constructor(props) {
    super(props);
    props.fetchQuestions();
    this.state = {
      questions: [],
      dataTable: [],
      filterTag: "",
      showPopup: { show: false, content: null },
    };
    this.initQuestions();
  }

  initQuestions = () => {
    this.props.questions?.data?.map((res) => {
      this.setState({ questions: res });
    });
  };

  componentDidMount() {
    this.setState({ dataTable: this.renderQuestions() });
  }

  renderQuestions() {
    if (this.state.filterTag !== "") {
      let filterTags = this.state.filterTag.split(",");
      return this.props.questions
        .filter((q) => filterTags.some((t) => q.Tags.includes(t)))
        .map((question, index) => {
          return (
            <tr key={question.Id} data-item={question}>
              <td>{index}</td>
              <td>{question.Id}</td>
              <td>
                <QuestionBox question={question} />
              </td>
              <td>{question.LastUpdated}</td>
              <td>{question.QuestionType}</td>
              <td>
                {" "}
                <button
                  className="ui button"
                  onClick={() => this.togglePopup(question)}>
                  Show
                </button>
              </td>
              <td>
                {" "}
                <Link
                  className="ui button"
                  to={{
                    pathname: `/questionsform/${question.Id}`,
                    formProps: { currentQuestion: question },
                  }}>
                  Edit
                </Link>
              </td>
            </tr>
          );
        });
    } else {
      return this.props.questions.map((question, index) => {
        return (
          <tr key={question.Id} data-item={question}>
            <td>{index}</td>
            <td>{question.Id}</td>
            <td>
              <QuestionBox question={question} />
            </td>
            <td>{question.LastUpdated}</td>
            <td>{question.QuestionType}</td>
            <td>
              {" "}
              <button
                className="ui button"
                onClick={() => this.togglePopup(question)}>
                Show
              </button>
            </td>
            <td>
              {" "}
              <Link
                className="ui button"
                to={{
                  pathname: `/questionsform/${question.Id}`,
                  formProps: { currentQuestion: question },
                }}>
                Edit
              </Link>
            </td>
          </tr>
        );
      });
    }
  }

  updateFiletrState = () => {
    this.setState({
      filterTag: window.document.getElementById("filterInput").value,
    });
  };

  FilerQuestions = () => {
    this.setState({ dataTable: this.renderQuestions() });
  };

  checkTags = (tag) => {
    const filterTags = this.state.filterTag.split(",");
    console.log("FilterTag:", filterTags);
    console.log("tag:", tag);
    console.log("flag", filterTags.includes(tag));
    if (filterTags.includes(tag)) return true;
    return false;
  };

  togglePopup = (question) => {
    this.setState({
      showPopup: { show: !this.state.showPopup.show, content: question },
    });
  };
  render() {
    return (
      <div>
        <div>
          <label htmlFor="filterInput">Search by Tag</label>
          <input
            id="filterInput"
            value={this.state.filterTag}
            onChange={this.updateFiletrState}
          />
        </div>
        <div className="field">
          <label className="white">All Questions</label>
          <table className="ui celled table">
            <thead>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>Content</th>
                <th>Last Updated</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>{this.renderQuestions()}</tbody>
          </table>
        </div>
        <div>
          {this.state.showPopup.show ? (
            <Popup
              content={this.state.showPopup.content}
              text="Close Me"
              closePopup={() => this.togglePopup(null)}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    questions: state.questions,
    selectedQuestions: state.questionsSelect,
  };
};

export default connect(mapStateToProps, { selectQuestions, fetchQuestions })(
  QuestionsTable
);
