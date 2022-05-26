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
  getcurrentprofile,
} from '../../actions/profileActions';
import { logout } from '../../actions/authActions';
import isEmpty from '../../validation/isEmpty';

const EditProfile = (props) => {
  let dashboardContent;
  const { isAuthenticated, current_user } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState(
    useSelector((state) => state.profile.profile)
  );
  const errors = useSelector((state) => state.errors);
  const navigate = useNavigate();
  const [auth, setAuth] = useState(current_user);
  const [newhandle, setNewhandle] = useState('');
  const [uname, setUname] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [twitter, setTwitter] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');
  const [youtube, setYoutube] = useState('');
  const [errorss, setErrors] = useState({});
  useEffect(() => {
    props.getcurrentprofile();
  }, [getcurrentprofile]);
  useEffect(() => {
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
  useEffect(() => {
    if (props.errors) {
      setErrors(props.errors);
    }
    if (profile) {
      setProfile(profile);
      const hobbiesCSV = profile ? profile.hobbies.join(',') : null;
      profile.uname = !isEmpty(profile.uname) ? profile.uname : '';
      profile.location = !isEmpty(profile.location) ? profile.location : '';
      profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
      profile.website = !isEmpty(profile.website) ? profile.website : '';
      profile.socials.facebook = !isEmpty(profile.socials.facebook)
        ? profile.socials.facebook
        : '';
      profile.socials.twitter = !isEmpty(profile.socials.twitter)
        ? profile.socials.twitter
        : '';
      profile.socials.instagram = !isEmpty(profile.socials.instagram)
        ? profile.socials.instagram
        : '';
      profile.socials.youtube = !isEmpty(profile.socials.youtube)
        ? profile.socials.youtube
        : '';
      setUname(profile.uname);
      setLocation(profile.location);
      setBio(profile.bio);
      setWebsite(profile.website);
      setFacebook(profile.socials.facebook);
      setTwitter(profile.socials.twitter);
      setInstagram(profile.socials.instagram);
      setHobbies(hobbiesCSV);
      setYoutube(profile.socials.youtube);
    } else {
      navigate('/dashboard');
    }
  }, [props.errors, props.profile]);
  function onSubmit(e) {
    e.preventDefault();
    if (uname.charAt(0) === '@') {
      setNewhandle(uname);
    } else {
      setNewhandle('@' + uname);
    }
    const newProfile = {
      uname: newhandle,
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
  }
  function onHandleBlur() {
    if (uname.charAt(0) === '@') {
      setNewhandle(uname.slice(1));
    } else {
      setNewhandle('@' + uname);
    }
  }
  if (isAuthenticated) {
    dashboardContent = (
      <div className='mb-2'>
        <form className='create-profile-form' onSubmit={onSubmit}>
          <h4 className='secondary-welcome-text'>Edit your profile</h4>
          <div className={classNames('invalid-feedback-container')}>
            {(errorss && errorss.handle) ||
            (errorss && errorss.uname) ||
            (errorss && errorss.location) ||
            (errorss && errorss.hobbies) ||
            (errorss && errorss.bio) ||
            (errorss && errorss.website) ||
            (errorss && errorss.facebook) ||
            (errorss && errorss.twitter) ||
            (errorss && errorss.instagram) ||
            (errorss && errorss.youtube) ||
            (errorss && errorss.message) ||
            (errorss && errorss.msg) ? (
              <div>
                <div className='invalid-feedback'>{errorss.handle}</div>
                <div className='invalid-feedback'>{errorss.uname}</div>
                <div className='invalid-feedback'>{errorss.location}</div>
                <div className='invalid-feedback'>{errorss.hobbies}</div>
                <div className='invalid-feedback'>{errorss.bio}</div>
                <div className='invalid-feedback'>{errorss.website}</div>
                <div className='invalid-feedback'>{errorss.facebook}</div>
                <div className='invalid-feedback'>{errorss.instagram}</div>
                <div className='invalid-feedback'>{errorss.twitter}</div>
                <div className='invalid-feedback'>{errorss.youtube}</div>
                <div className='invalid-feedback'>{errorss.msg}</div>
                <div className='invalid-feedback'>{errorss.message}</div>
              </div>
            ) : null}
          </div>
          <div className='row'>
            <div className='col-lg-6'>
              <TextFieldGroup
                name='uname'
                placeholder='&#xf1fa;  |  Username'
                value={uname}
                onChange={(e) => setUname(e.target.value)}
                onBlur={onHandleBlur}
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
EditProfile.prototypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getcurrentprofile: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired,
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
  getcurrentprofile,
})(EditProfile);
