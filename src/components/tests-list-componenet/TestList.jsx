import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './TestList.css';

const TestList = (props) => {
    console.log(props);
    const [data, setData] = useState([]);
    useEffect(() => {
        let tmp = [];
        props.tests.then(res => {

            res.data.map((t, index) => {
                console.log(t);
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
                                <button>Edit</button>
                            </div>
                        </td>
                    </tr>)
                }
            })
            setData(tmp);
            console.log(tmp);
        })
    }, [])
    return (
        <div className="TestList">
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
    )
}

const mapStateToProps = (state) => {
    return ({
        tests: state.tests
    })

}

export default connect(mapStateToProps)(TestList)
