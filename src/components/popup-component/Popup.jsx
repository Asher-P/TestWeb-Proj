import React from 'react';
import './Popup.css';

class Popup extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);

    }
    renderContent = () => {
        let data = [];
        for (var key in this.props.content) {
            var value = this.props.content[key];
            if (key !== "Answers")
                data.push(<div className="item black">{`${key}: ${value}`}</div>)
            else {
                data.push(<div>{key}:{value.map(item=><div className={`item ${item.isCorrect? "greenText" : "redText"}`}>{item.Content}</div>)}
                </div>)
            }
        }
        return data;
    }
    render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <h3>
                        <div className="ui list">
                            {this.renderContent()}
                        </div>
                    </h3>
                    <button onClick={this.props.closePopup}>close me</button>
                </div>
            </div>
        );
    }
}
export default Popup
