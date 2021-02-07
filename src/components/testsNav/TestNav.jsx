import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/navigation";

const TestNav = (props) => {
  console.log("test nav props",props);
  const organization = JSON.parse(sessionStorage.organization);
  console.log("organization in test nav",JSON.parse(sessionStorage.organization));
  return (
    <div className="ui list">
      <Navigation organization={organization} />
      <div className="item">
          <Link className="ui inverted primary button" 
            to={{
              pathname: `/createtest`,
              organizationProps: {organization} ,
            }}>
            Add a test
          </Link>
      </div>
      <div className="item">
          <Link className="ui inverted primary button" 
            to={{
              pathname: `/testlist`,
              organizationProps: {organization} ,
            }}>
            Show tests
          </Link>
      </div>
    </div>
  );
};

export default TestNav;
