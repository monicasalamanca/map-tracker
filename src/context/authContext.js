import { AsyncStorage } from 'react-native';
import CreateDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      // Here we wanto to update oru object 
      //  we have to modify the object and return a new state
      return { ...state, errorMessage: action.payload }
    case 'clear_err_msg': 
      return { ...state, errorMessage: '' }
    case 'signin':
      return { errorMessage: '', token: action.payload }
    case 'signout':
      return { token: null, errorMessage: '' }
    default: 
      return state;
  }
};

const tryLocalSignin = dispatch => async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch({ type: 'signin', payload: token });
    navigate('TrackList');
  } else {
    navigate('LoginFlow');
  }
};

const clearErrorMsg = dispatch => () => {
  dispatch({ type: 'clear_err_msg' })
}

// Everytime we create a action function its going to be a function with dispatch that will return a function
const signup = dispatch => async ({ email, password }) => {
  try {
    const response = await trackerApi.post('/signup', { email, password });
    await AsyncStorage.setItem('token', response.data.token);
    // dispatch new action 
    dispatch({ type: 'signup', payload: response.data.token });

    // Navigate to Track List Screen
    navigate('TrackList');
  } catch (err) {
    dispatch({ type: 'add_error', payload: 'Something went wrong with signup' })
  }
};

const signin = (dispatch) => async ({ email, password }) => {
  try {
    const response = await trackerApi.post('/signin', { email, password });
    await AsyncStorage.setItem('token', response.data.token);

    //dispatch new action
    dispatch({ type: 'signin', payload: response.data.token });

    // Navigate to Track List Screen
    navigate('TrackList');

  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with signin'
    })
  }
};

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem('token');
  dispatch({ type: 'signout' });
  navigate('loginFlow');
};


export const { Provider, Context } = CreateDataContext(
  authReducer,
  { signin, signup, signout, clearErrorMsg, tryLocalSignin },
  { token: null, errorMessage: '' }
);