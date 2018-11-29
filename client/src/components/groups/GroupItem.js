import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteGroup } from "../../actions/groupActions";

class GroupItem extends Component {
  onDeleteClick(id) {
    this.props.deleteGroup(id);
  }

  render() {
    const { group, auth, showActions } = this.props;

    return (
      <div className="card card-body red-bkd mb-3">
        <div className="row">
          <div className="col-md-12">
            <h3>{group.groupname}</h3>
          </div>
          <div className="col-md-12">
            {showActions ? (
              <span>
                <Link
                  to={`/groups/${group._id}`}
                  className="btn btn-success mr-1"
                >
                  Chat
                </Link>
                {group.user === auth.user.id ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, group._id)}
                    type="button"
                    className="btn btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

GroupItem.defaultProps = {
  showActions: true
};

GroupItem.propTypes = {
  deleteGroup: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteGroup }
)(GroupItem);
