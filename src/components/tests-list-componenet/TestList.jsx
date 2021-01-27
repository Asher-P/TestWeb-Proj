import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { clearselectQuestions } from '../../actions';
import TestEdit from '../test-edit/TestEdit';

const TestList = (props) => {
    console.log("TestList props",props);
    const [testEdit, setTestEdit] = useState(null);
    const [data, setData] = useState([]);
    const getChoosenTest=(test)=>{return test}

    const setTestData=(test)=>{
        setTestEdit(null);
        setTestEdit(<TestEdit Test={test}></TestEdit>);
    }
    const clearData=()=>{
        setTestEdit(null);
        props.clearselectQuestions();
    }

    useEffect(() => {
        let tmp = [];
        props.tests.then(res => {

            res.data.map((t, index) => {
                {
                    tmp.push(<tr key={index}>
                        <td>
                            {t.Title}
                        </td>
                        <td></td>
                        <td>
                            {t.questions.length}
                        </td>
                        <td>
                            <div>
                                <button onClick={()=>setTestData(t)}>Edit</button>
                            </div>
                        </td>
                    </tr>)
                }
            })
            setData(tmp);
        })
    }, [])
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
                    {data}
                </tbody>
            </table>
            </div>
            <div>
                <button onClick={()=>clearData()}>cencel
                </button>
            </div>
            <div>
                {testEdit}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return ({
        tests: state.tests
    })

}

export default connect(mapStateToProps,{clearselectQuestions})(TestList)
