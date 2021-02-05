import "./Popup.css";
import { Link } from "react-router-dom";

function EntryPopup(props) {
  return (
    <div className="popup">
      <div className="popup_inner">
        <text>
          Are you sure you want to continue as {props.organization.Name}?
        </text>
        <div>
          <button class="ui inverted red button" onClick={props.closePopup}>
            No
          </button>
          <button class="ui inverted primary button">
            <Link
              to={{
                pathname: `/home`,
                organizationProps: props.organization,
              }}>
              Yes
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default EntryPopup;
