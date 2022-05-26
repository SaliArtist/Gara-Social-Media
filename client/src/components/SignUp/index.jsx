import { GoogleIcon, LoginGaraIcon, LoginGaraIconsm } from '../SideBar/Icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import classnames from 'classnames';
import { register } from '../../actions/registerAction';
import TextFieldGroup from '../common/TextFieldGroup';

function SignUp(props) {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [conpassword, setConpassword] = useState('');

  function onSubmit(e) {
    e.preventDefault();
    const newUser = {
      fname: fname,
      lname: lname,
      email: email,
      password: password,
      conpassword: conpassword,
    };
    props.register(newUser);
  }
  return (
    <div className='login-container'>
      <div className='gara-icon-container'>
        <LoginGaraIcon />
      </div>
      <div className='gara-icon-containersm signup-gara-icon'>
        <LoginGaraIconsm />
      </div>
      <div className='login-main'>
        <div className='login-content'>
          <form onSubmit={onSubmit}>
            <div className='signup-form'>
              <div className='signup-ref-btn-container'>
                <button className='google-signup'>
                  <GoogleIcon /> <span>Sign Up with Google </span>
                </button>
              </div>{' '}
              <div className='invalid-feedback-container'>
                {(props.errors.data && props.errors.data.conpassword) ||
                (props.errors.data && props.errors.data.msg) ? (
                  <div>
                    <div className='invalid-feedback'>
                      {props.errors.data.conpassword}
                    </div>
                    <div className='invalid-feedback'>{props.errors.msg}</div>
                  </div>
                ) : null}
              </div>
              <h1>Sign up to Gara</h1>
              <div className='login-input-container'>
                <TextFieldGroup
                  name='fname'
                  placeholder='First name'
                  type='text'
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  error={props.errors.data?.fname}
                />
              </div>
              <div className='login-input-container'>
                <TextFieldGroup
                  name='lname'
                  placeholder='Last name'
                  type='text'
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                  error={props.errors.data?.lname}
                />
              </div>
              <div className='login-input-container'>
                <TextFieldGroup
                  name='email'
                  placeholder='&#xf0e0; Email'
                  type='text'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={props.errors.data?.email}
                />
              </div>
              <div className='login-input-container'>
                <TextFieldGroup
                  name='password'
                  placeholder='&#xf023; Password'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={props.errors.data?.password}
                />
              </div>
              <div className='login-input-container'>
                <TextFieldGroup
                  name='conpassword'
                  placeholder='&#xf023; Confirm Password'
                  type='password'
                  value={conpassword}
                  onChange={(e) => setConpassword(e.target.value)}
                  error={props.errors.data?.conpassword}
                />
              </div>
              <div className='login-input-container'>
                <button className='signup-submit rounded-pill'>Sign Up</button>
              </div>
              <div className='signup-ref-container'>
                <div>or</div>
                <button className='sm-google-signup'>
                  <GoogleIcon /> <span>Sign Up with Google</span>
                </button>
                <h3 className='no-acc'>Already have an account?</h3>
                <Link to='/'>
                  <button type='submit' className='signup-ref'>
                    Login
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
        <div className='signup-refer'>
          <div className='signup-refer-content'>
            <h2>Already have an account?</h2>
            <h3>Login and see whats happening around you</h3>
            <div className='signup-ref-btn-container'>
              <Link to='/'>
                <button className='signup-ref-btn'>Login</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.register.user,
    errors: state.errors,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    register: (newUser) => dispatch(register(newUser)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
