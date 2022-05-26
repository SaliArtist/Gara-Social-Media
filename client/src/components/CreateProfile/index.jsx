import React from 'react';
import { connect, useSelector } from 'react-redux';
import SideBar from '../SideBar';
import TextFieldGroup from '../common/TextFieldGroup';
import { useNavigate } from 'react-router-dom';
import TextAreaGroup from '../common/TextAreaGroup';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import {
  clearcurrentprofile,
  createProfile,
} from '../../actions/profileActions';
import { logout } from '../../actions/authActions';

const CreateProfile = (props) => {
  let dashboardContent;
  const { isAuthenticated, current_user } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const [auth, setAuth] = useState(current_user);
  const [newhandle, setNewhandle] = useState('');
  const [handle, setHandle] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [twitter, setTwitter] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');
  const [youtube, setYoutube] = useState('');
  useEffect(() => {
    if (profile !== {}) {
    } else {
      navigate('/dashboard');
    }
    if (!isAuthenticated) {
      navigate('/');
    }
    if (profile === null) {
      navigate('/dashboard');
    }
    if (props.errors === null) {
      navigate('/dashboard');
    }
    if (props.errors === 'Unauthorized') {
      navigate('/');
      props.logout(logout);
      props.clearcurrentprofile(clearcurrentprofile);
    }
  }, [isAuthenticated, profile, props.errors]);
  function onSubmit(e) {
    e.preventDefault();
    const newHandle = '@' + handle;
    const newProfile = {
      uname: newHandle,
      location: location,
      bio: bio,
      website: website,
      hobbies: hobbies,
      facebook: facebook,
      twitter: twitter,
      instagram: instagram,
      youtube: youtube,
    };
    props.createProfile(newProfile);
    if (typeof props.error != 'undefined') {
      setTimeout(function () {
        location.reload(true);
      }, 3000);
    }
  }
  if (isAuthenticated) {
    dashboardContent = (
      <div className='mb-2'>
        <form className='create-profile-form' onSubmit={onSubmit}>
          <h4 className='secondary-welcome-text'>
            Proceed to create your profile
          </h4>
          <div className={classNames('invalid-feedback-container')}>
            {(props.error && props.errors.handle) ||
            (props.error && props.errors.uname) ||
            (props.error && props.errors.location) ||
            (props.error && props.errors.hobbies) ||
            (props.error && props.errors.bio) ||
            (props.error && props.errors.website) ||
            (props.error && props.errors.facebook) ||
            (props.error && props.errors.twitter) ||
            (props.error && props.errors.instagram) ||
            (props.error && props.errors.youtube) ||
            (props.error && props.errors.message) ||
            (props.error && props.errors.msg) ? (
              <div>
                <div className='invalid-feedback'>{props.errors.handle}</div>
                <div className='invalid-feedback'>{props.errors.uname}</div>
                <div className='invalid-feedback'>{props.errors.location}</div>
                <div className='invalid-feedback'>{props.errors.hobbies}</div>
                <div className='invalid-feedback'>{props.errors.bio}</div>
                <div className='invalid-feedback'>{props.errors.website}</div>
                <div className='invalid-feedback'>{props.errors.facebook}</div>
                <div className='invalid-feedback'>{props.errors.instagram}</div>
                <div className='invalid-feedback'>{props.errors.twitter}</div>
                <div className='invalid-feedback'>{props.errors.youtube}</div>
                <div className='invalid-feedback'>{props.errors.msg}</div>
                <div className='invalid-feedback'>{props.errors.message}</div>
              </div>
            ) : null}
          </div>
          <div className='row'>
            <div className='col-lg-6'>
              <TextFieldGroup
                name='uname'
                placeholder='&#xf1fa;  |  Username'
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                onBlur={(e) => setNewhandle(e.target.value)}
                info={'Your Username: @' + newhandle}
              />
              <TextFieldGroup
                name='location'
                placeholder='&#xf041;  |  Location'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <TextAreaGroup
                name='bio'
                placeholder='&#xf036; |  Bio'
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
              <TextFieldGroup
                name='hobbies'
                placeholder='&#xf118;  |  Hobbies'
                value={hobbies}
                onChange={(e) => setHobbies(e.target.value)}
                info='Separate each by a comma'
              />
            </div>
            <div className='col-lg-6'>
              <TextFieldGroup
                name='website'
                placeholder='&#xf0c1; |  Website'
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
              <TextFieldGroup
                name='facebook'
                placeholder='&#xf09a; |  Facebook'
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
              />
              <TextFieldGroup
                name='instagram'
                placeholder='&#xf099;  |  Twitter'
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
              />
              <TextFieldGroup
                name='instagram'
                placeholder='&#xf16d;  |  Instagram'
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
              <TextFieldGroup
                name='instagram'
                placeholder='&#xf16a;  |  Youtube'
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}
              />
            </div>
          </div>
          <button
            type='submit'
            className='create-profile-btn color-white btn btn-success btn-lg my-2'
          >
            Submit<span>&#xf1d8;</span>
          </button>
        </form>
      </div>
    );
  }
  return (
    <div className='content-container row'>
      <div className='row col-lg-8 h-auto mx-auto'>
        <div className='dashboard-content-main mx-auto my-4'>
          {dashboardContent}

          <SideBar />
        </div>
      </div>
    </div>
  );
};
CreateProfile.prototypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.profile,
  profile: state.profile,
  errors: state.errors,
});
export default connect(mapStateToProps, {
  createProfile,
  clearcurrentprofile,
  logout,
})(CreateProfile);
