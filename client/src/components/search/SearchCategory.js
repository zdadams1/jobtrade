import React, { Component } from "react";
import PropTypes from "prop-types";

class SearchCategory extends Component {
  render() {
    const { profile } = this.props;
    let category;
    if (profile.options[0].category === "Outdoor") {
      category = <div>Outdoor Activities</div>;
    }
    if (profile.options[0].category === "Indoor") {
      category = <div>Indoor Recreation</div>;
    }
    if (profile.options[0].category === "Nightlife") {
      category = <div>Nightlife</div>;
    }
    if (profile.options[0].category === "Food") {
      category = <div>going out to eat</div>;
    }

    return <div>{category}</div>;
  }
}
SearchCategory.propTypes = {
  profile: PropTypes.object.isRequired
};

export default SearchCategory;
