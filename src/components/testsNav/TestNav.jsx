import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/navigation";

const TestNav = (props) => {
  const organization = props.location.organizationProps.organization;

  return (
    <div className="ui list">
      <Navigation organization={organization} />
      <div className="item">
        <button class="ui inverted primary button" className="button">
          <Link
            to={{
              pathname: `/createtest`,
              organizationProps: { organization: organization },
            }}>
            Add a test
          </Link>
        </button>
      </div>
      <div className="item">
        <button class="ui inverted primary button" className="button">
          <Link
            to={{
              pathname: `/testlist`,
              organizationProps: { organization: organization },
            }}>
            Show tests
          </Link>
        </button>
      </div>
    </div>
  );
};

export default TestNav;
