import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchTests, clearselectQuestions } from "../../actions";
import { BrowserRouter as Router, Link, useRouteMatch } from "react-router-dom";
import Navigation from "../Navigation/navigation";

class TestList extends React.Component {
    
  organization = this.props.location.organizationProps.organization;
     EXAMURL = "/exam"
    constructor(props) {
        super(props);
        this.state = { data: [] };
        this.props.clearselectQuestions();
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
                    <td><button className="ui button"
                     onClick={()=>this.copyToClipboard(`${window.location.protocol}//${window.location.host}${this.EXAMURL}/${t.Id}`)}>Copy</button></td>
                    <td>
                        {t.questions.length}
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

    componentWillMount() {
        this.props.fetchTests();
        let tmp = [];

    }

  componentWillMount() {
    this.props.fetchTests();
    let tmp = [];
  }

  render() {
    return (
      <div className="TestList">
         <Navigation
        organization={this.organization}
      />
        <div>
          <table className="ui table">
            <thead>
              <tr>
                <td>Title</td>
                <td>Link</td>
                <td>Questions Sum</td>
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

export default connect(mapStateToProps, { fetchTests,clearselectQuestions })(TestList);
