import { connect } from 'react-redux';
import React, { Component } from 'react';
import { FaSearch, FaMoon, FaSun } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useDarkMode from '../../hooks/useDarkMode';
import { GaraIcon, NotifIcon } from '../SideBar/Icons';
import { logout } from '../../actions/authActions';
import { clearcurrentprofile } from '../../actions/profileActions';
import Popover from 'react-bootstrap/Popover';
import { getcurrentprofile } from '../../actions/profileActions';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

class TopNav extends Component {
  onLogout(e) {
    e.preventDefault();
    this.props.clearcurrentprofile();
    this.props.logout();
  }
  componentDidMount() {
    this.props.getcurrentprofile();
  }
  render() {
    const { isAuthenticated, current_user } = this.props.auth;
    const { profile } = this.props.profile;

    const profilePopover = (
      <Popover id='popover-basic' className='popover'>
        {/* <Popover.Header as='h3'>Popover right</Popover.Header> */}
        <Popover.Body>
          <div className='w-100 m-auto text-center'>
            <div className='profile-icon-container m-auto mt-2'>
              <Link to='/dashboard' className='w-2 rounded-full'>
                <img
                  src={
                    profile === null
                      ? 'https://www.pngitem.com/pimgs/b/30-307416_camera-icon-png-transparent-background.png'
                      : current_user.avatar
                  }
                  className='w-100'
                  alt=''
                />
              </Link>
            </div>
            <div className='uname lg:mt-2 m-auto mt-4'>
              <Link to={`/profile/${profile?.uname}`}>
                <h5>{profile?.uname}</h5>
              </Link>
            </div>
            <div className='lg:my-2 mt-3'>
              <button
                id='logout'
                className='btn btn-sm btn-danger sm:w-20 px-2'
                onClick={this.onLogout.bind(this)}
              >
                Logout
              </button>
            </div>
          </div>
        </Popover.Body>
      </Popover>
    );
    const notifPopover = (
      <Popover id='popover-basic' className='popover'>
        <Popover.Header as='h3'>Notifications</Popover.Header>
        <Popover.Body dialogClassName='dark:bg-gray-500'></Popover.Body>
        <Popover.Header>
          <div className='w-100 m-auto text-center'>
            <Link to='/notifications' className='m-auto'>
              <a href='#' className='m-auto'>
                View All
              </a>
            </Link>
          </div>
        </Popover.Header>
      </Popover>
    );
    const NotifIcon = () => (
      <OverlayTrigger trigger='focus' placement='bottom' overlay={notifPopover}>
        <a tabindex='0'>
          <svg
            className='notif-icon group-hover:fill-current z-0 mt-2'
            xmlns='http://www.w3.org/2000/svg'
            width='1em'
            viewBox='0 0 88.5693 162.622'
            fill='#089447'
            fillRule='evenodd'
          >
            <defs>
              <style>.a</style>
            </defs>
            <path
              className='a'
              d='M83.6777,59.6174,52.04,57.7784a1.216,1.216,0,0,1-.97-1.7264L70.9431,10.7427C73.1376,5.7391,69.7117,0,64.53,0H36.5213A14.71,14.71,0,0,0,22.7185,10.4619L.4629,78.6937c-1.8671,5.7243,2.149,11.6926,7.8339,11.6418l21.8554-.195a1.2,1.2,0,0,1,1.104,1.5494l-18.71,69.376a1.1479,1.1479,0,0,0,1.9707,1.1109L87.37,68.6317C90.081,65.1509,87.9153,59.8637,83.6777,59.6174Z'
            />
          </svg>
        </a>
      </OverlayTrigger>
    );
    if (isAuthenticated) {
      return (
        <div className='top-navigation'>
          <div>
            <GaraIcon />
            {/* <Title /> */}
          </div>
          <div className='navdiv'>
            <ThemeIcon />
            <Search />
            <OverlayTrigger
              trigger='focus'
              placement='bottom'
              overlay={notifPopover}
            >
              <NotifIcon />
            </OverlayTrigger>
            <div className='profile-icon-container'>
              <OverlayTrigger
                trigger='focus'
                placement='bottom'
                overlay={profilePopover}
              >
                <a tabindex='0'>
                  <img
                    src={
                      profile === null
                        ? 'https://www.pngitem.com/pimgs/b/30-307416_camera-icon-png-transparent-background.png'
                        : current_user.avatar
                    }
                    className='w-100'
                    alt=''
                  />
                </a>
              </OverlayTrigger>
            </div>
          </div>
        </div>
      );
    } else {
      return <TopNavig />;
    }
  }
}
export function TopNavig() {
  return (
    <div className='top-nav'>
      <div>
        <GaraIcon />
        {/* <Title /> */}
      </div>
      <div className='navdiv'>
        <ThemeIcon />
        <Search />
        {Logbuttons}
      </div>
    </div>
  );
}
export function TopNavigation() {
  return (
    <div className='top-navigation'>
      <div>
        <GaraIcon />
        {/* <Title /> */}
      </div>
      <div className='navdiv'>
        <ThemeIcon />
        <Search />
        <NotifIcon />
      </div>
    </div>
  );
}
const Logbuttons = (
  <div className='login-input-container init-nav-btn'>
    <Link to='/signup'>
      <button className='login-submit btn btn-sm btn-primary'>Sign Up</button>
    </Link>
    <Link to='/'>
      <button className='login-submit btn btn-sm btn-secondary '>Login</button>
    </Link>
  </div>
);
const ThemeIcon = () => {
  const [darkTheme, setDarkTheme] = useDarkMode();
  const handleMode = () => setDarkTheme(!darkTheme);
  return (
    <span onClick={handleMode}>
      {darkTheme ? (
        <FaSun size='24' className='top-navigation-icon' />
      ) : (
        <FaMoon size='24' className='top-navigation-icon' />
      )}
    </span>
  );
};

const Search = () => (
  <div className='search'>
    <input className='search-input' type='text' placeholder='Search...' />
    <FaSearch size='18' className='text-secondary my-auto' />
  </div>
);

const mapStateToProps = (state, dispatch) => {
  return {
    auth: state.auth,
    profile: state.profile,
    isAuthenticated: state.auth?.isAuthenticated,
    current_user: state.auth?.current_user,
    logout: () => dispatch(logout()),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    clearcurrentprofile: () => dispatch(clearcurrentprofile()),
    getcurrentprofile: () => dispatch(getcurrentprofile()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TopNav);
