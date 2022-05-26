import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProfileByUname } from '../../actions/profileActions';
import SideBar from '../SideBar';

const Profile = ({ getProfileByUname }, props) => {
  const { handle } = useParams();
  useEffect(() => {
    getProfileByUname(handle);
  }, [getProfileByUname, handle]);
  return (
    <div className='content-container row'>
      <div className='row col-lg-8 h-auto mx-auto'>
        <div className='dashboard-content-main mx-auto my-6'>
          <SideBar />
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { getProfileByUname })(Profile);
