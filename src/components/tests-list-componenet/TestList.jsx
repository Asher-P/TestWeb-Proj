import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchTests, clearselectQuestions } from "../../actions";
import { BrowserRouter as Router, Link, useRouteMatch } from "react-router-dom";
import Navigation from "../Navigation/navigation";

 const VIcon="https://icon2.cleanpng.com/20180624/pyp/kisspng-desktop-wallpaper-check-mark-clip-art-5b3000d43fbb46.5193392515298725962611.jpg";
 const  XIcon="data:image/png;base64,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";
   
class TestList extends React.Component {
    
  organization = JSON.parse(sessionStorage.organization);
     EXAMURL = "/exam"
    constructor(props) {
        super(props);
        this.state = { data: [] };
        this.props.clearselectQuestions();
        this.props.fetchTests(this.organization.Id);
        console.log("teste list props",this.props);
    }
     copyToClipboard(text) {
            var dummy = document.createElement("textarea");
            // to avoid breaking orgain page when copying more words
            // cant copy when adding below this code
            // dummy.style.display = 'none'
            document.body.appendChild(dummy);
            //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
            dummy.value = text;
            dummy.select();
            document.execCommand("copy");
            document.body.removeChild(dummy);
        alert("coppied");
    }
    renderList() {
        //console.log(this.props);
      return  this.props.tests.map((t, index) =>{
          return( <tr key={index}>
                    <td>
                        {t.Title}
                    </td>        
                    <td>
                      {t.Field.Name}
                      </td>                                                          
                    <td><button className="ui button"
                     onClick={()=>this.copyToClipboard(`${window.location.protocol}//${window.location.host}${this.EXAMURL}/${t.Id}`)}>Copy</button></td>
                    <td>
                        {t.questions.length}
                    </td>
                    <td>
                      <img src={t.ShowAnswers? VIcon:XIcon} width="50" height="50"/>
                    </td>
                    <td>

                        <div>
                        <Link to={
                    {
                        pathname: `edittest/${t.Id}`, test: t,
                        organizationProps:this.organization 
                    }
                }><button className="ui button">Edit</button></Link>
                        </div>
                    </td>
                </tr>)
            }
      )
    }


  render() {
    return (
      <div className="TestList">
<<<<<<< HEAD
        <Navigation
          organization={this.props.location.organizationProps.organization}
        />
=======
         <Navigation
        organization={this.organization}
      />
>>>>>>> a116f6b16154119b74d22d2a9a88f5ac62e739e0
        <div>
          <table className="ui table">
            <thead>
              <tr>
                <td>Title</td>
                <td>Field</td>
                <td>Link</td>
                <td>Questions Sum</td>
                <td>Answers overview</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>{this.renderList()}</tbody>
          </table>
        </div>
        <div></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tests: state.test,
  };
};

export default connect(mapStateToProps, { fetchTests, clearselectQuestions })(
  TestList
);
