import "./Popup.css";
import { Link } from "react-router-dom";

function EntryPopup(props) {
  return (
    <div className="popup">
      <div className="popup_inner">
        <p class="ui text shape">
          Are you sure you want to continue as {props.organization.Name}?
        </p>
        <div>
          <button class="ui inverted red button" onClick={props.closePopup}>
            No
          </button>
          <Link onClick={()=> sessionStorage.setItem("organization",JSON.stringify(props.organization))}
            class="ui inverted primary button"
            to={{
              pathname: `/home`,
              organizationProps: { organization: props.organization },
            }}>
            Yes
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EntryPopup;
