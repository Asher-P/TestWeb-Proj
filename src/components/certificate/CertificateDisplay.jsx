import React from 'react';
import {Link} from 'react-router-dom';
import './CertificateDisplay.css';
import ExamService from '../../services/examsService';
import {PDFDownloadLink} from '@react-pdf/renderer';
import {CertificatePDF} from './CertificatePDF';

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
        this.state = {grade:0, Success:false,pdfReady:false};
        }
        catch{
            //window.location.pathname = '/';
        }
    }
    toggle() {
        this.setState((prevState) => ({
            ready: false
        }), () => {     
            setTimeout(() => {
                this.setState({ ready: true });
            }, 1);
        });
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
        add= Math.ceil(add);
        console.log("pssing",Number(this.formProps.test.PassingGrade))
        if(Number(this.formProps.test.PassingGrade) < add)
            this.setState({Success:true})
        this.setState({grade: add});  
       this.exam = {Id:uuidv4(),...this.formProps, Grade:add, date:this.d}
       ExamService.addExam(this.exam);
    }

    
    render() {
        const { ready } = this.state;

        const MyDocument = <CertificatePDF exam={this.formProps} success={this.state.Success} grade={this.state.grade}/>
        console.log("sucsess",this.state.Success)
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
                                <span className="span5">with score of <b className="big greentxt">{this.state.grade}</b></span> <br /><br /><br /><br />
                                <span className="span2"><i>dated</i></span><br/>
                                <span className="span3"> {this.d.getDate()}/{this.d.getMonth()+1}/{this.d.getFullYear()} </span>
                               <br/>
                               <br/>
                               <br/>
                               {this.state.Success ? (<span className="span2 greentxt">{this.formProps.test.SuccessMes}</span>):<span className="ui span2 redtxt">{this.formProps.test.FailureMes}</span>}
                               <br/>
                               <br/>
                               <br/>
                                <div className="ui two buttons">
                   {this.formProps.test.ShowAnswers ? (<Link className="ui inverted primary button" 
                    to={
                        {
                            pathname: `/showanswers?id=${this.exam.Id}`,
                        }
                    }
                    params={{ testvalue: "hello" }}
                    target="_blank"
                    >Show my Answers</Link>):null}
                        <div>
                {ready && (
                    <PDFDownloadLink document={MyDocument} fileName="PDF" className="ui button">
                        {
                            ({ blob, url, loading, error }) => (loading ? 'Loading document...' :
                                <button className="ui inverted primary button"  onClick={() => (this.setState({ ready: false }))}>
                                    download pdf
                                </button>
                            )
                        }
                    </PDFDownloadLink>
                  )}
                {!ready && (
                   <button className="ui inverted primary button"  onClick={() => this.toggle()}>
                        generate pdf
                    </button>
                )}
            </div>
                    </div>
                    </div>
                </div>
            </div>
        )
  
}

}
export default CertificateDisplay;
