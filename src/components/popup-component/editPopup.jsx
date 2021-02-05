import "./Popup.css";
import { Link } from "react-router-dom";

function EditPopup(props) {
  return (
    <div className="popup">
      <div className="popup_inner">
        <h1>Edited Successfully</h1>
        <button class="ui inverted primary button">
          <Link
            to={{
              pathname: `/questions`,
              organizationProps: {
                organization: props.organization,
              },
            }}>
            Ok, great!
          </Link>
        </button>
      </div>
    </div>
  );
}
export default EditPopup;
