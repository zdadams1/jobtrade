import React, { Component } from "react";

class ProfilePlaces extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-danger mb-3">
            <h3 className="text-center text-white">
              Here are the places I want to go
            </h3>
            {profile.options[0].places}
          </div>
        </div>
      </div>
    );
  }
}

export default ProfilePlaces;
