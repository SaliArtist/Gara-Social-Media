import SideBar from '../SideBar';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, Component } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getProfiles } from '../../actions/profileActions';
import Animation from '../Dashboard/animation';

class AllProfiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }
  render() {
    const { profiles, loading } = this.props.profile;
    let dashboardContent;
    if (profiles === null && loading === true) {
      dashboardContent = (
        <div>
          <Animation />
        </div>
      );
    } else {
      if (profiles.length > 0) {
        dashboardContent = <h2>Profiles</h2>;
        console.log(profiles);
      } else {
        dashboardContent = (
          <div>
            <h2>No Profiles Found</h2>
          </div>
        );
      }
    }
    return (
      <div className='content-container row'>
        <div className='row col-lg-8 h-auto mx-auto'>
          <div className='dashboard-content-main mx-auto my-6'>
            {dashboardContent}
            <SideBar />
          </div>
        </div>
      </div>
    );
  }
}
AllProfiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { getProfiles })(AllProfiles);
