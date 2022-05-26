import SideBar from '../SideBar';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Animation from './animation';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { getcurrentprofile, deleteProfile } from '../../actions/profileActions';
import { updateAvatar } from '../../actions/profileActions';
import MyPostFeed from './MyPostFeed';
import { clearcurrentprofile } from '../../actions/profileActions';
import { logout } from '../../actions/authActions';

const Dashboard = ({ getcurrentprofile, deleteProfile, login }, props) => {
  let dashboardContent;
  const navigate = useNavigate();
  const { isAuthenticated, current_user } = useSelector((state) => state.auth);
  const { profile, loading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const handleCloseImagePicker = () => setShowImagePicker(false);
  const handleShowImagePicker = () => setShowImagePicker(true);
  const [imgSrc, setImgSrc] = useState('');
  const [avatar, setAvatar] = useState('');
  const [avatarChange, setAvatarChange] = useState(false);
  const [showA, setShowA] = useState(false);
  const ImagePicker = () => {
    const seed = Math.round(Math.random() * 100);
    return (
      <div
        className='w-100 rounded-full'
        onClick={() =>
          setImgSrc(`https://avatars.dicebear.com/api/open-peeps/${seed}.svg`)
        }
      >
        <img
          src={`https://avatars.dicebear.com/api/open-peeps/${seed}.svg`}
          alt=''
          className='w-100'
        />
      </div>
    );
  };
  useEffect(() => {
    getcurrentprofile();
    if (avatar === '') {
      setAvatar(current_user.avatar);
    } else {
      setAvatar(avatar);
    }
  }, [avatar, current_user.avatar, getcurrentprofile]);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
    if (props.errors === 'Unauthorized') {
      navigate('/');
    }
  }, [isAuthenticated, navigate, props.errors]);
  function onAvatarPickSubmit(e) {
    e.preventDefault();
    const newAvatar = {
      avatar: imgSrc,
    };
    dispatch(updateAvatar(newAvatar));
    setAvatar(imgSrc);
    setAvatarChange(true);
    getcurrentprofile();
  }
  function onLogout(e) {
    e.preventDefault();
    dispatch(clearcurrentprofile());
    dispatch(logout());
  }
  if (profile === null && loading === true) {
    dashboardContent = (
      <div>
        <Animation />
      </div>
    );
  } else if (profile === null && loading === false) {
    dashboardContent = (
      <div>
        <h1>You need to be logged in to access this page.</h1>
        <Button className='btn-lg my-3' onClick={onLogout} variation='primary'>
          Login
        </Button>
      </div>
    );
  } else {
    if (Object.keys(profile).length > 0) {
      dashboardContent = (
        <div>
          <div className='profile-container col-sm-12'>
            <div
              className='profile-picture-container rounded-circle w-25 m-auto bg-white'
              onClick={handleShow}
            >
              <img src={avatar} className='w-full' alt='' />
            </div>
            <button className='btn btn-link' onClick={handleShowImagePicker}>
              Change Avatar
            </button>
            <div className='name-and-uname'>
              <div className='name'>
                <h2 className='mt-2'>
                  {current_user.fname} {current_user.lname}
                </h2>
              </div>
              <div className='uname'>
                <Link to={`/profile/${profile.uname}`}>
                  <h5>{profile.uname}</h5>
                </Link>
              </div>
            </div>
            <div className='location-container my-2'>
              <h5>
                <i className='bi bi-geo-alt-fill'></i>&nbsp; &nbsp;
                {profile.location}
              </h5>
            </div>
            <div className='hobbies-container row my-2'>
              {profile.hobbies.map((hobbie) => {
                return (
                  <div className='hobbie-container'>
                    <strong>{hobbie}</strong>
                  </div>
                );
              })}
            </div>
            <div className='bio-container'>
              <h5>{profile.bio}</h5>
            </div>
            <div className='followers-following-container row'>
              <div className='following-container'>
                <h4>{profile.following.length} Following</h4>
              </div>
              <div className='followers-container'>
                <h4>{profile.followers.length} Followers</h4>
              </div>
            </div>
            <div className='socials-container row my-1'>
              {profile.socials.twitter ? (
                <div className='social-container'>
                  <a href={profile.socials.twitter}>
                    <i className='bi bi-twitter'></i>
                  </a>
                </div>
              ) : null}

              {profile.socials.facebook ? (
                <div className='social-container'>
                  <a href={profile.socials.facebook}>
                    <i className='bi bi-facebook'></i>
                  </a>
                </div>
              ) : null}

              {profile.socials.instagram ? (
                <div className='social-container'>
                  <a href={profile.socials.instagram}>
                    <i className='bi bi-instagram'></i>
                  </a>
                </div>
              ) : null}

              {profile.socials.youtube ? (
                <div className='social-container'>
                  <a href={profile.socials.youtube}>
                    <i className='bi bi-youtube'></i>
                  </a>
                </div>
              ) : null}
            </div>
            <Link to='/edit-profile' className='text-primary'>
              <button
                type='button'
                className='edit-profile-btn btn btn-primary my-2 mb-4'
              >
                <i className='bi bi-person-lines-fill'></i> Edit Profile
              </button>
            </Link>
          </div>
          <div className='my-posts w-100 my-4'>
            <MyPostFeed
              profile={profile}
              current_user={current_user}
              isAuthenticated={isAuthenticated}
              errors={props.errors}
            />
          </div>
        </div>
      );
      console.log(profile);
    } else {
      dashboardContent = (
        <div>
          <h2 className='welcome-text'>Welcome, {current_user.fname}</h2>
          <h4 class='secondary-welcome-text'>Proceed to create profile</h4>
          <Link
            to='/create-profile'
            className='create-profile-btn color-white btn btn-lg my-2 mb-4'
          >
            Create Profile
          </Link>
        </div>
      );
      if (!isAuthenticated) {
        navigate('/');
        dashboardContent = (
          <div>
            <h3 className='h3'>You need to be logged in to view ths page</h3>
            <Link
              to='/'
              className='btn btn-lg btn-primary hover:shadow-lg text-white'
            >
              Login
            </Link>
          </div>
        );
      } else {
      }
    }
  }
  return (
    <div className='content-container col-sm-12 row'>
      <div className='row col-lg-8 col-sm-12 sm:ml-10 h-auto mx-auto'>
        <div className='dashboard-content-main mx-auto my-6'>
          {dashboardContent}
          <SideBar />

          <Modal
            show={show}
            size='md'
            aria-labelledby='contained-modal-title-vcenter'
            centered
            onHide={handleClose}
          >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <img src={current_user.avatar} className='w-100' alt='' />
            </Modal.Body>
          </Modal>
          <Modal
            show={showImagePicker}
            size='lg'
            aria-labelledby='contained-modal-title-vcenter'
            centered
            onHide={handleCloseImagePicker}
          >
            <form onSubmit={onAvatarPickSubmit}>
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body>
                <Container>
                  <Row>
                    <Col xs={12} md={3}>
                      <img src={imgSrc} className='w-100 rounded-full' alt='' />
                    </Col>
                    <Col xs={4} md={3}>
                      <Col xs={6} md={4}>
                        <ImagePicker />
                      </Col>
                      <Col xs={6} md={4}>
                        <ImagePicker />
                      </Col>
                      <Col xs={6} md={4}>
                        <ImagePicker />
                      </Col>
                    </Col>
                    <Col xs={4} md={3}>
                      <Col xs={6} md={4}>
                        <ImagePicker />
                      </Col>
                      <Col xs={6} md={4}>
                        <ImagePicker />
                      </Col>
                      <Col xs={6} md={4}>
                        <ImagePicker />
                      </Col>
                    </Col>
                    <Col xs={4} md={3}>
                      <Col xs={6} md={4}>
                        <ImagePicker />
                      </Col>
                      <Col xs={6} md={4}>
                        <ImagePicker />
                      </Col>
                      <Col xs={6} md={4}>
                        <ImagePicker />
                      </Col>
                    </Col>
                  </Row>
                </Container>
              </Modal.Body>
              <Modal.Footer>
                <small>Click any avatar to refresh</small>
                <Button variant='secondary' onClick={handleCloseImagePicker}>
                  Cancel
                </Button>
                <Button
                  type='submit'
                  variant='primary'
                  disabled={imgSrc === '' ? true : false}
                  onClick={handleCloseImagePicker}
                >
                  Change Avatar
                </Button>
              </Modal.Footer>
            </form>
          </Modal>
        </div>
      </div>
      {avatarChange !== '' ? (
        <ToastContainer position='bottom-end'>
          <Toast
            onClose={() => {
              setShowA(false);
              setAvatarChange('');
            }}
            show={avatarChange}
            autohide
          >
            <Toast.Header>
              <strong className='me-auto'>Gara</strong>
              <small>Just Now</small>
            </Toast.Header>
            <Toast.Body>You'll see your avatar on your next login</Toast.Body>
          </Toast>
        </ToastContainer>
      ) : null}
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors,
});
export default connect(mapStateToProps, {
  getcurrentprofile,
  deleteProfile,
})(Dashboard);
