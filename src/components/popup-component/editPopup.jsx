import "./Popup.css";
import { Link } from "react-router-dom";

function EditPopup(props) {
  return (
    <div className="popup">
      <div className="popup_inner">
        <h1>Edited Successfully</h1>
        <Link
          class="ui inverted primary button"
          to={{
            pathname: `/questions`,
            organizationProps: {
              organization: props.organization,
            },
          }}>
          Ok, great!
        </Link>
      </div>
    </div>
  );
}
export default EditPopup;
