import { GoogleIcon, LoginGaraIcon, LoginGaraIconsm } from '../SideBar/Icons';
import { Link, useNavigate } from 'react-router-dom';
import classnames from 'classnames';
import { useState } from 'react';
import { login } from '../../actions/authActions';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
function Login(props) {
  const navigate = useNavigate();
  const [uname, setUname] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    if (props.isAuthenticated) {
      navigate('/dashboard');
    }
  }, [props.isAuthenticated, navigate]);
  function onSubmit(e) {
    e.preventDefault();
    const newLogin = {
      uname: uname,
      password: password,
    };
    props.login(newLogin);
  }
  return (
    <div className='login-container'>
      <div className='gara-icon-container'>
        <LoginGaraIcon />
      </div>
      <div className='gara-icon-containersm'>
        <LoginGaraIconsm />
      </div>
      <div className='login-main'>
        <div className='login-content'>
          <form onSubmit={onSubmit}>
            <div className='login-form'>
              <div className='invalid-feedback-container'>
                {props.errors.msg ? (
                  <div>
                    <div className='invalid-feedback'>{props.errors.msg}</div>
                  </div>
                ) : null}
              </div>
              <h1>Login to Gara</h1>
              <div className='login-input-container'>
                <TextFieldGroup
                  name='uname'
                  placeholder='&#xf1fa;  |  Username'
                  type='text'
                  value={uname}
                  onChange={(e) => setUname(e.target.value)}
                  error={props.errors.uname}
                />
              </div>
              <div className='login-input-container'>
                <TextFieldGroup
                  name='password'
                  placeholder='&#xf023;  |  Password'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={props.errors.password}
                />
              </div>
              <div className='forgot-password-container'>
                <a href='#sdfsdf'>Forgot password?</a>
              </div>
              <div className='login-input-container'>
                <button className='btn btn-secondary rounded-pill w-50'>
                  Login
                </button>
              </div>
              <div className='signup-ref-container'>
                <h3 className='no-acc'>Don't have an account?</h3>
                <Link to='/signup'>
                  <button type='submit' className='signup-ref'>
                    Sign Up
                  </button>
                </Link>
                <div>or</div>
                <button className='sm-google-signup'>
                  <GoogleIcon /> <span>Sign Up with Google</span>
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className='signup-refer'>
          <div className='signup-refer-content'>
            <h2>New Here?</h2>
            <h3>Create your account and join the Gara family now</h3>
            <div className='signup-ref-btn-container'>
              <Link to='/signup'>
                <button className='signup-ref-btn'>Sign Up</button>
              </Link>
              <div>or</div>
              <button className='google-signup'>
                <GoogleIcon /> <span>Sign Up with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth?.isAuthenticated,
    current_user: state.auth?.current_user,
    errors: state.errors,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    login: (newUser) => dispatch(login(newUser)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
