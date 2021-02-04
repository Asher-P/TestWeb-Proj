import React from 'react';
import {Link} from 'react-router-dom';
import './CertificateDisplay.css';
import ExamService from '../../services/examsService';

const uuidv4=()=> {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
class CertificateDisplay extends React.Component {
    exam={}
    formProps =this.props.location.formProps;
    scoreOfQuestion = 100/this.formProps.test.questions.length;
    d =new Date();
    constructor(props) {
        try{
        super(props);
        console.log("loc", this.formProps);
        this.state = {grade:0};
        }
        catch{
            window.location.pathname = '/';
        }
    }
    calcScore = (answer, correct)=>{
       
          if(answer.length != correct.length){
            return 0;
          }
          else{
              for (let index = 0; index < answer.length; index++) {
                  const element = answer[index];
                  if(!correct.includes(element)){
                    return 0;
                  }
              }
          }
          return this.scoreOfQuestion;
    }
    componentDidMount(){
        let add = 0;
         this.formProps.answers.forEach(a=>{
            if(!(Array.isArray(a.answer))){
                a.answer = [a.answer];
              }
              let scoreForAnswer =this.calcScore(a.answer,a.correctAnswer);
            console.log("score",scoreForAnswer)
           add = add + scoreForAnswer;
           console.log("grade",this.state.grade);
        })
        this.setState({grade: add});  
       this.exam = {Id:uuidv4(),...this.formProps, Grade:add, date:this.d}
       ExamService.addExam(this.exam);
    }
    
    render() {
        console.log("exam",this.exam)
        return (
            <div className="CertificateDisplay">
                <div className="div1">
                    <div className="div2">
                    <span className="span1">Certificate of Completion</span>
                        <br/><br/>
                            <span className="span2"><i>This is to certify that</i></span>
                            <br/><br/>
                                <span className="span3"><b>{this.formProps.student?.studentName},ID:{this.formProps.student?.studentId}</b></span><br /><br />
                                <span className="span2" ><i>has completed the Test</i></span> <br /><br />
                                <span className="span3">{this.formProps.test?.Title}</span> <br /><br />
                                <span className="span5">with score of <b>{this.state.grade}</b></span> <br /><br /><br /><br />
                                <span className="span2"><i>dated</i></span><br/>
                                <span className="span3"> {this.d.getDay()}/{this.d.getMonth()}/{this.d.getFullYear()} </span>
                    </div>
                    <div>
                    <Link to={
                    {
                        pathname: `/showanswers?id=${this.exam.Id}`,
                    }
                }
                    params={{ testvalue: "hello" }}
                target="_blank"
                >Show my Answers</Link>
                    </div>
                </div>
            </div>

        )
    }
}

    export default CertificateDisplay
