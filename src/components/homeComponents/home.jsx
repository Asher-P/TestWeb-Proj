import React, { Component } from "react";
import { fetchOrganizations } from "../../actions";
import { connect } from "react-redux";
import EntryPopup from "../popup-component/EntryPopup";

class Home extends Component {
  constructor(props) {
    super(props);
    props.fetchOrganizations();
    this.state = {
      currentOrganization: undefined,
      showPopup: { show: false },
    };
  }

  togglePopup = () => {
    this.setState({
      showPopup: { show: !this.state.showPopup.show },
    });
  };

  showPopupWindow = (e) => {
    if (this.state.currentOrganization === undefined) {
      alert("Please choose an organization");
      return;
    } else {
      this.togglePopup();
    }
  };

  organizationChanged = (e) => {
    let organizations = this.props.organizations;
    for (let index = 0; index < organizations.length; index++) {
      if (organizations[index].Id === Number(e.currentTarget.value)) {
        this.setState({ currentOrganization: organizations[index] });
      }
    }
  };

  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Home page</h1>
          <h2>Welcome!</h2>
          <form>
            <div>
              <label>Please Select an organization</label>
              <select defaultValue="" onChange={this.organizationChanged}>
                <option value="" disabled={true}>
                  Choose
                </option>
                <option value={1}>Sela</option>
                <option value={2}>Microsoft</option>
                <option value={3}>Google</option>
              </select>
            </div>
            <div>
              {this.state.showPopup.show ? (
                <EntryPopup
                  organization={this.state.currentOrganization}
                  closePopup={() => this.togglePopup()}
                />
              ) : null}
            </div>
            <input
              type="button"
              onClick={this.showPopupWindow}
              value="Continue"
            />
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    organizations: state.organizations,
  };
};

export default connect(mapStateToProps, { fetchOrganizations })(Home);
