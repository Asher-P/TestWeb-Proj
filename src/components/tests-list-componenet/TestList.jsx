import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchTests } from '../../actions';
import {
    BrowserRouter as Router,
    Link,
    useRouteMatch
} from "react-router-dom";
import TestEdit from '../test-edit/TestEdit';

class TestList extends React.Component {


    constructor(props) {
        super(props);
        this.state = { data: [] };
    }

    renderList() {
        console.log(this.props);
      return  this.props.tests.map((t, index) =>{
          return( <tr key={index}>
                    <td>
                        {t.Title}
                    </td>
                    <td></td>
                    <td>
                        {t.questions.length}
                    </td>
                    <td>

                        <div>
                            <Link to={`edittest/${t.Id}`}><button className="ui button">Edit</button></Link>
                        </div>
                    </td>
                </tr>)
            }
      )
    }

    componentWillMount() {
        this.props.fetchTests();
        let tmp = [];
        console.log("props", this.props)

    }

    render() {
        return (
            <div className="TestList">
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
                        <tbody>
                            {this.renderList()}
                        </tbody>
                    </table>
                </div>
                <div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        tests: state.test
    })

}

export default connect(mapStateToProps, { fetchTests })(TestList)
