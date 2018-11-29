import React, { Component } from "react";
import defaultImage from "../../img/default-pic.jpg";

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;

    let image;

    if (profile.image === null || profile.image === undefined) {
      image = defaultImage;
    } else {
      image = profile.image;
    }

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body red-bkd">
            <div className="row">
              <div className=" m-auto">
                <img src={image} />
              </div>
            </div>
            <div className="text-center mt-2">
              <h1 className="display-4 text-center">{profile.user.name}</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
