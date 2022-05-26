import ContentContainer from './components/ContentContainer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopNav from './components/TopNavigation';
import Login from './components/login';
import SignUp from './components/SignUp';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Dashboard from './components/Dashboard';
import CreateProfile from './components/CreateProfile';
import setAuthToken from './util/setAuthToken';
import jwtDecode from 'jwt-decode';
import { logout, setCurrentUser } from './actions/authActions';
import { decode } from 'jsonwebtoken';
import { clearcurrentprofile } from './actions/profileActions';
import EditProfile from './components/EditProfile';
import AllProfiles from './components/AllProfiles';
import Profile from './components/Profile/Profile';
// import PrivateRoute from './components/common/PrivateRoute';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwtDecode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now / 1000;
  if (decode.exp < currentTime) {
    store.dispatch(logout);
    store.dispatch(clearcurrentprofile);
    window.location.href = '/';
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='App flex'>
          <Routes>
            <Route exact path='/' element={<Login />} />
            <Route exact path='/signup' element={<SignUp />} />
            <Route exact path='/home' element={<ContentContainer />} />
            <Route exact path='/dashboard' element={<Dashboard />} />
            <Route exact path='/create-profile' element={<CreateProfile />} />
            <Route exact path='/edit-profile' element={<EditProfile />} />
            <Route exact path='/allprofiles' element={<AllProfiles />} />
            <Route exact path='/profile/:handle' element={<Profile />} />
          </Routes>
          <TopNav />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
