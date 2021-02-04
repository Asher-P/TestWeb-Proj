import React from "react";
import history from "../../History/history";
import Navigation from "../Navigation/navigation";

const TestNav = (props) => {
  return (
    <div className="ui list">
      <Navigation
        organization={props.location.organizationProps.organization}
      />
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
