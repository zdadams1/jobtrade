import React, { Component } from "react";

class ProfilePlaces extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body red-bkd mb-3">
            <h3 className="text-center text-white profile-header">
              Places and/or Activities i'm interested in
            </h3>
            {profile.options[0].places}
          </div>
        </div>
      </div>
    );
  }
}

export default ProfilePlaces;
