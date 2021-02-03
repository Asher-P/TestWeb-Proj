import React, { Component } from "react";
import { fetchOrganizations } from "../../actions";
import { connect } from "react-redux";

class Home extends Component {
  constructor(props) {
    super(props);
    props.fetchOrganizations();
    this.state = {
      organizations: [],
    };
  }

  showOrganizations = (e) => {
    console.log(this.props.organizations);
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
              <select></select>
            </div>
            <div>
              <input
                type="button"
                onClick={this.showOrganizations}
                value="Show All"
              />
            </div>
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
