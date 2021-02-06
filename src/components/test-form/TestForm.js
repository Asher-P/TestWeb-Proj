import React from "react";
import "./TestForm.css";
import { connect } from "react-redux";
import { selectQuestions, fetchQuestions,clearselectQuestions } from "../../actions";
import FormInputs from "./FormInputs";
import TestsSerevice from "../../services/testsService";
import QuestionBox from "../question-box-component/QuestionBox";
import Popup from "../popup-component/Popup";
import Navigation from '../Navigation/navigation';

function ColorRow(e) {
  let TR = e.target;
  while (TR.tagName != "TR") {
    TR = TR.parentNode;
  }
  if (TR.classList.contains("green")) {
    TR.classList.remove("green");
    /*console.log("disable")*/
  } else {
    TR.classList.add("green");
    /*console.log("enable")*/
  }
}

class TestForm extends React.Component {
  organization= this.props.location.organizationProps.organization ;
  constructor(props) {
    super(props);
    props.fetchQuestions();
    //console.log(props);
    this.state = {
      dataTable: [],
      filterTag: "",
      questions: [],
      showPopup: { show: false, content: null },
      currentField: {},
    };
    this.props.clearselectQuestions();
    //console.log("Form props",props);

  }

  initQuestions = () => {
    //console.log("data", this.props.questions.data);

    this.props.questions?.data?.map((res) => {
      this.setState({ questions: res });
    });
  };

  togglePopup = (question) => {
    this.setState({
      showPopup: { show: !this.state.showPopup.show, content: question },
    });
  };

  componentDidMount() {
    this.props.fetchQuestions();
  }

  onSubmit = (test) => {
    test = {
      ...test,
      questions: this.props.selectedQuestions.map((q) => q.Id),
    };
    alert("Test successfully created");
    TestsSerevice.addTest(test);
    console.log(test);
   let organizationProps = new Object();
    organizationProps.organization = this.organization;
    this.props.history.push({pathname:"/tests", organizationProps:organizationProps })
  };

  checkTags = (tag) => {
    const filterTags = this.state.filterTag.split(",");
    //console.log("FilterTag:", filterTags);
    //console.log("tag:", tag);
    //console.log("flag", filterTags.includes(tag));
    if (filterTags.includes(tag)) return true;
    return false;
  };
  FieldChanged=(field)=>{
    console.log("field in func", field);
    this.setState({currentField:field});
    console.log("in FieldChanged",this.state.currentField);
    this.props.clearselectQuestions();
  }

  renderQuestions() {
    //console.log("render", this.state.currentField)
    //console.log("q.Fields",this.props.questions[0]?.Fields)
    let filterdFieldQuestion = this.props.questions.filter(q=>q.Fields?.includes(Number(this.state.currentField?.Id)))
    if (this.state.filterTag !== "") {
      let filterTags = this.state.filterTag.split(",");
      return filterdFieldQuestion
        .filter((q) => filterTags.some((t) => q.Tags.includes(t)))
        .map((question, index) => {
          return (
            <tr
              key={question.Id}
              data-item={question}
              onClick={(e) => {
                ColorRow(e);
                this.props.selectQuestions(question);
              }}
              className={
                this.props.selectedQuestions.find((q) => q.Id === question.Id)
                  ? "green"
                  : ""
              }>
              <td>{index}</td>
              <td>{question.Id}</td>
              <td>
                <QuestionBox question={question} />
              </td>
              <td>
                {" "}
                <button
                  className="ui button"
                  onClick={() => this.togglePopup(question)}>
                  Show
                </button>
              </td>
            </tr>
          );
        });
    } else {
      return filterdFieldQuestion.map((question, index) => {
        return (
          <tr
            key={question.Id}
            data-item={question}
            onClick={(e) => {
              ColorRow(e);
              this.props.selectQuestions(question);
            }}
            className={
              this.props.selectedQuestions.find((q) => q.Id === question.Id)
                ? "green"
                : ""
            }>
            <td>{index}</td>
            <td>{question.Id}</td>
            <td>
              <QuestionBox question={question} />
            </td>
            <td>
              {" "}
              <button
                className="ui button"
                onClick={() => this.togglePopup(question)}>
                Show
              </button>
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

  render() {
    return (
      <div className="TestForm">
        <Navigation
        organization={this.organization}
      />
        <FormInputs
        FieldChanged={this.FieldChanged}
        organization = {this.organization}
          renderField={this.renderQuestions}
          onSubmit={this.onSubmit}></FormInputs>
        <div>
          <input
            id="filterInput"
            value={this.state.filterTag}
            onChange={this.updateFiletrState}
          />
          <button onClick={this.FilerQuestions}>Search</button>
        </div>
        <div className="field">
          <label className="white">Chose questions</label>
          <table className="ui celled table">
            <thead>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>Content</th>
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

export default connect(mapStateToProps, { selectQuestions, fetchQuestions,clearselectQuestions })(
  TestForm
);
