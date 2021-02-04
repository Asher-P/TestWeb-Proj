import { Component } from "react";
import QuestionTypes from "./questionTypes";
import MultipleChoiceQuestion from "./multipleChoiceQuestion";
import ChoiceQuestion from "./choiceQuestion";
import Popup from "../popup-component/Popup";
import QuestionService from "../../services/questionsService";
import { connect } from "react-redux";
import { fetchQuestion } from "../../actions";
import Navigation from "../Navigation/navigation";
import EditPopup from "../popup-component/editPopup";

class QuestionsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      errors: {},
      questionBody: "",
      multiAnswers: [{ Content: "", isCorrect: false }],
      choiceAnswers: [{ Content: "", isCorrect: false }],
      extraInfo: "",
      tags: "",
      inputsNum: 4,
      questionType: "Choice",
      fields: [],
      showPopup: { show: false, content: "" },
      showEditPopup: { show: false },
      Index: 13,
    };
    if (props.location.organizationProps === undefined)
      window.location.replace("/");
  }

  cleanAllInputs = () => {
    let allAnswers = document.getElementsByName("allAnswers");
    allAnswers.forEach((element) => {
      element.value = "";
    });
    let allRadioAndCheckboxes = document.getElementsByName("correctAnswers");
    allRadioAndCheckboxes.forEach((element) => {
      element.checked = false;
    });
  };

  addAnswerInput = () => {
    if (this.state.Index <= 16) {
      let input = document.getElementById(this.state.Index);
      input.hidden = false;
      this.updateInputsNum(this.state.Index - 8);
      if (this.state.Index < 16) {
        this.setState({ Index: this.state.Index + 1 });
      } else {
        alert("Reached the maximum limit of answers you can add");
      }
      console.log("done", input.id);
    }
  };

  removeAnswerInput = () => {
    if (this.state.Index >= 13) {
      let input = document.getElementById(this.state.Index);
      input.hidden = true;
      this.updateInputsNum(this.state.Index - 9);
      if (this.state.Index > 13) {
        this.setState({ Index: this.state.Index - 1 });
      } else {
        alert("You can not remove any more answers");
      }
    }
  };

  componentDidMount() {
    if (
      this.props.match.params.id !== undefined &&
      this.props.match.params.id !== null
    ) {
      if (this.props.location.formProps !== undefined) {
        let question = this.props.location.formProps.currentQuestion;
        let AddButton = document.getElementById("AddButton");
        let EditButton = document.getElementById("EditButton");
        AddButton.hidden = true;
        EditButton.hidden = false;
        this.setState({
          title: question.Title,
          questionBody: question.QuestionBody,
          extraInfo: question.ExtraInfo,
          tags: question.Tags,
          questionType: question.QuestionType,
        });
        if (question.QuestionType === "Choice") this.setState({ inputsNum: 4 });
        else {
          this.loadAsMultiChoiceType(question);
        }
      }
    }
    let organization = this.props.location.organizationProps.organization;
    let currentFields = [];
    for (let index = 0; index < organization.Fields.length; index++) {
      currentFields.push({
        Id: organization.Fields[index].Id,
        Name: organization.Fields[index].Name,
        isChecked: false,
      });
    }
    this.setState({ fields: currentFields });
  }

  loadAsMultiChoiceType = (question) => {
    let selectElement = document.getElementById("MultiChoiceSelect");
    let multiple = document.getElementById("multipleChoiceQ");
    let choice = document.getElementById("choiceQ");
    choice.hidden = true;
    multiple.hidden = false;
    selectElement.selected = true;
    let inputsNumber = 0;
    for (let index = 0; index < question.Answers.length; index++) {
      inputsNumber++;
    }
    for (let index = 4; index < inputsNumber; index++) {
      let input = document.getElementById(index + 9);
      input.hidden = false;
      console.log("done:", input.id);
    }
    console.log("inputs: ", inputsNumber, inputsNumber + 9);
    this.setState({ inputsNum: inputsNumber, Index: inputsNumber + 9 });
  };

  onAddQuestion = async (question) => {
    console.log("ok great!");
    await QuestionService.addQuestion(question);
  };

  onEditQuestion = async (question, id) => {
    console.log("great!");
    await QuestionService.editQuestion(question, id);
  };

  //|================= start of onChange events =================|
  multiAnswerChanged = (e) => {
    let allAnswers = [...this.state.multiAnswers];
    let answerId = e.currentTarget.id;
    if (allAnswers[answerId - 1] === undefined) {
      //id is higher than the index by one
      allAnswers[answerId - 1] = { Content: "", isCorrect: false };
    }
    allAnswers[answerId - 1].Content = e.currentTarget.value;
    this.setState({ multiAnswers: allAnswers });
  };

  fieldChecked = (e) => {
    let currentId = Number(e.currentTarget.id);
    let fields = this.state.fields;
    for (let index = 0; index < fields.length; index++) {
      if (fields[index].Id === currentId) {
        fields[index].isChecked = !fields[index].isChecked;
      }
    }
    this.setState({ fields: fields });
  };

  choiceAnswerChanged = (e) => {
    let allAnswers = [...this.state.choiceAnswers];
    let answerIndex = e.currentTarget.id - 9;
    if (allAnswers[answerIndex] === undefined) {
      //id is higher than the index by one
      allAnswers[answerIndex] = { Content: "", isCorrect: false };
    }
    allAnswers[answerIndex].Content = e.currentTarget.value;
    this.setState({ choiceAnswers: allAnswers });
  };

  correctChoiceAnswerChanged = (e) => {
    let answerIndex = e.currentTarget.id - 8;
    let allAnswers = [...this.state.choiceAnswers];
    for (let index = 0; index < 4; index++) {
      if (allAnswers[index] !== undefined) allAnswers[index].isCorrect = false;
      else allAnswers[index] = { Content: "", isCorrect: false };
    }
    allAnswers[answerIndex].isCorrect = true;
    console.log("all answers", allAnswers);
    this.setState({ choiceAnswers: allAnswers });
  };

  correctMultiAnswerChanged = (e) => {
    let answerIndex = e.currentTarget.id;
    let allAnswers = [...this.state.multiAnswers];
    let answer = allAnswers[answerIndex];
    if (answer === undefined)
      allAnswers[answerIndex] = { Content: "", isCorrect: true };
    else
      allAnswers[answerIndex] = {
        Content: answer.Content,
        isCorrect: !answer.isCorrect,
      };
    this.setState({ multiAnswers: allAnswers });
    console.log("all answers: ", allAnswers);
  };

  typeChanged = (e) => {
    let multiple = document.getElementById("multipleChoiceQ");
    let choice = document.getElementById("choiceQ");
    this.cleanAllInputs();
    if (e.currentTarget.value === "Choice") {
      this.setState({
        inputsNum: 4,
        questionType: "Choice",
        choiceAnswers: [{ Content: "", isCorrect: false }],
      });
      multiple.hidden = true;
      choice.hidden = false;
    } else {
      this.setState({
        questionType: "MultipleChoice",
        multiAnswers: [{ Content: "", isCorrect: false }],
      });
      multiple.hidden = false;
      choice.hidden = true;
    }
  };

  titleChanged = (e) => {
    this.setState({ title: e.currentTarget.value, errors: {} });
  };

  bodyChanged = (e) => {
    this.setState({ questionBody: e.currentTarget.value, errors: {} });
  };

  extraInfoChanged = (e) => {
    this.setState({ extraInfo: e.currentTarget.value, errors: {} });
  };

  tagsChanged = (e) => {
    this.setState({ tags: e.currentTarget.value, errors: {} });
  };
  //|================= end of onChange events =================|

  //////////Validation\\\\\\\\\\
  validateQuestion = () => {
    const errors = {};
    if (this.state.title.trim() === "") errors.title = "Title is required.";
    if (this.state.questionBody.trim() === "")
      errors.content = "Content is required.";
    let count = 0;
    for (let index = 0; index < this.state.fields.length; index++) {
      if (!this.state.fields[index].isChecked) count++;
    }
    if (count === this.state.fields.length)
      errors.fields = "At least 1 field checked is required.";
    if (!this.validateAllAnswers())
      errors.answers =
        "Please fill all of the answers and have at least 1 correct answer depends on the question type.";
    return Object.keys(errors).length === 0 ? null : errors;
  };

  validateAllAnswers = () => {
    let allAnswers = [];
    let count = 0;
    if (this.state.questionType === "MultipleChoice") {
      allAnswers = this.state.multiAnswers;
      console.log("all answers on validation", allAnswers);
      for (let index = 0; index < this.state.inputsNum; index++) {
        if (!this.validateAnswer(allAnswers[index])) {
          return false;
        }
        if (allAnswers[index].isCorrect) count++;
      }
    } else {
      allAnswers = this.state.choiceAnswers;
      console.log("all answers on validation", allAnswers);
      for (let index = 0; index < allAnswers.length; index++) {
        if (!this.validateAnswer(allAnswers[index])) {
          return false;
        }
        if (allAnswers[index].isCorrect) count++;
      }
    }

    if (count === 0) {
      return false;
    }
    return true;
  };

  validateAnswer = (answer) => {
    if (answer === undefined) {
      console.log("wait what?", answer === undefined);
      return false;
    } else {
      if (answer.Content.trim() === "") {
        console.log("ok what the hell?", answer.Content.trim() === "");
        return false;
      }
    }
    return true;
  };
  //////////End of validation\\\\\\\\\\

  submitQuestion = (e) => {
    e.preventDefault();
    const errors = this.validateQuestion();
    let tags = this.state.tags.toString();
    tags = tags.trim();
    let tagsArr = tags.split(",");
    console.log(this.state.inputsNum);
    this.setState({ errors: errors || {} });
    if (errors) {
      return;
    }
    let answers = [];
    if (this.state.questionType === "Choice")
      answers = this.state.choiceAnswers;
    else answers = this.state.multiAnswers;
    let fields = [];
    this.state.fields.forEach((field) => {
      fields.push(field.Id);
    });
    const questionToAdd = {
      Title: this.state.title,
      QuestionBody: this.state.questionBody,
      Answers: answers,
      ExtraInfo: this.state.extraInfo,
      Tags: tagsArr,
      QuestionType: this.state.questionType,
      Fields: fields,
      LastUpdated: new Date().toLocaleDateString(),
    };
    console.log(this.props.location.formProps);
    if (
      this.props.location.formProps === undefined ||
      this.props.location.formProps === null
    ) {
      this.onAddQuestion(questionToAdd);
    } else {
      this.onEditQuestion(questionToAdd, this.props.match.params.id);
    }
    this.cleanAllInputs();
    this.setState({
      title: "",
      questionBody: "",
      extraInfo: "",
      tags: "",
      multiAnswers: [{ Content: "", isCorrect: false }],
      choiceAnswers: [{ Content: "", isCorrect: false }],
    });
    if (e.currentTarget.id === "EditButton") this.toggleEditPopup();
  };

  renderFields() {
    let organization = this.props.location.organizationProps.organization;
    return organization.Fields.map((field, index) => {
      return (
        <div>
          <label htmlFor={field.Id}>{field.Name}</label>
          <input
            id={field.Id}
            value={field.Name}
            onChange={this.fieldChecked}
            type="checkbox"
          />
        </div>
      );
    });
  }

  showCurrentQuestion = () => {
    let answers = [];
    if (this.state.questionType === "Choice")
      answers = this.state.choiceAnswers;
    else answers = this.state.multiAnswers;
    let fields = [];
    this.state.fields.forEach((field) => {
      if (field.isChecked) fields.push(field.Name);
    });
    const question = {
      Title: this.state.title,
      QuestionBody: this.state.questionBody,
      Answers: answers,
      ExtraInfo: this.state.extraInfo,
      Tags: this.state.tags,
      Fields: fields,
    };
    this.togglePopup(question);
  };

  togglePopup = (question) => {
    this.setState({
      showPopup: { show: !this.state.showPopup.show, content: question },
    });
  };

  toggleEditPopup = () => {
    this.setState({
      showEditPopup: { show: !this.state.showEditPopup.show },
    });
  };

  updateInputsNum = (numOfInputs) => {
    if (this.state.inputsNum !== numOfInputs)
      this.setState({ inputsNum: numOfInputs });
  };

  render() {
    const { title, errors, questionBody, extraInfo, tags } = this.state;
    return (
      <div>
        <Navigation
          organization={this.props.location.organizationProps.organization}
        />
        <QuestionTypes onChange={this.typeChanged} />
        <form onSubmit={this.submitQuestion}>
          <div className="form-group space">
            <label htmlFor="title">Title: </label>
            <input
              value={title}
              onChange={this.titleChanged}
              id="title"
              type="text"
              className="input form-control"
            />
            {errors.title && (
              <div className="alert alert-danger">{errors.title}</div>
            )}
          </div>
          <div className="form-group space">
            <label htmlFor="Content">Content: </label>
            <input
              value={questionBody}
              onChange={this.bodyChanged}
              id="Content"
              type="text"
            />
            {errors.content && (
              <div className="alert alert-danger">{errors.content}</div>
            )}
          </div>
          <div>
            <label htmlFor="ExtraInfo">Extra Info</label>
            <textarea
              id="ExtraInfo"
              value={extraInfo}
              onChange={this.extraInfoChanged}></textarea>
          </div>
          <div>
            <label htmlFor="Tags">Tags</label>
            <input
              id="Tags"
              type="text"
              value={tags}
              onChange={this.tagsChanged}
            />
          </div>
          <div>
            Fields:
            {this.renderFields()}
            {errors.fields && (
              <div className="alert alert-danger">{errors.fields}</div>
            )}
          </div>
          <div hidden={false} id="choiceQ">
            <ChoiceQuestion
              answerChanged={this.choiceAnswerChanged}
              correctAnswerChanged={this.correctChoiceAnswerChanged}
            />
            {errors.answers && (
              <div className="alert alert-danger">{errors.answers}</div>
            )}
          </div>
          <div hidden={true} id="multipleChoiceQ">
            <MultipleChoiceQuestion
              answerChanged={this.multiAnswerChanged}
              addAnswerInput={this.addAnswerInput}
              removeAnswerInput={this.removeAnswerInput}
              correctAnswerChanged={this.correctMultiAnswerChanged}
              updateInputsNum={this.updateInputsNum}
            />
            {errors.answers && (
              <div className="alert alert-danger">{errors.answers}</div>
            )}
          </div>
        </form>
        <input
          hidden={false}
          type="button"
          id="AddButton"
          onClick={this.submitQuestion}
          className="btn btn-primary btn-sm"
          value="Add Question"
        />
        <input
          hidden={true}
          type="button"
          id="EditButton"
          onClick={this.submitQuestion}
          className="btn btn-primary btn-sm"
          value="Edit Question"
        />
        <div>
          {this.state.showPopup.show ? (
            <Popup
              content={this.state.showPopup.content}
              text="Close Me"
              closePopup={() => this.togglePopup(null)}
            />
          ) : null}
        </div>
        <div>
          {this.state.showEditPopup.show ? (
            <EditPopup
              organization={this.props.location.organizationProps.organization}
            />
          ) : null}
        </div>
        <br />
        <div>
          <input
            type="button"
            onClick={this.showCurrentQuestion}
            value="Show Question"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    question: state.currentQuestion,
  };
};

export default connect(mapStateToProps, { fetchQuestion })(QuestionsForm);
