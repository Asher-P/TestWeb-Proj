import React from "react";
import history from "../../History/history";

const TestNav = () => {
  return (
    <div className="ui list">
      <div className="item">
        <button className="button" onClick={() => history.push("/createtest")}>
          Add a test
        </button>
        <div className="item">
          <button className="button" onClick={() => history.push("/testlist")}>
            Show test
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestNav;
