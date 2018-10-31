import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import GroupItem from "../groups/GroupItem";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";

import Spinner from "../common/Spinner";
import { getGroup } from "../../actions/groupActions";

class Group extends Component {
  componentDidMount() {
    this.props.getGroup(this.props.match.params.id);
  }

  render() {
    const { group, loading } = this.props.group;

    let groupContent;

    if (group === null || loading || Object.keys(group).length === 0) {
      groupContent = <Spinner />;
    } else {
      groupContent = (
        <div>
          <GroupItem group={group} showActions={false} />
          <CommentForm groupId={group._id} />
          <CommentFeed groupId={group._id} comments={group.comments} />
        </div>
      );
    }

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/groups" className="btn btn-light mb-3">
                Back
              </Link>
              {groupContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Group.propTypes = {
  getGroup: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  group: state.group
});

export default connect(
  mapStateToProps,
  { getGroup }
)(Group);
