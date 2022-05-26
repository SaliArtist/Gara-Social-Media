import axios from 'axios';

const setAuthToken = (token) => {
  if (token) {
    //   Apply heaer to every request
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    //   Delete header
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
