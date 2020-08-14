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
    case 'signup':
      return { errorMessage: '', token: action.payload }
    default: 
      return state;
  }
};

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

const signin = (dispatch) => {
  return ({ email, password }) => {
    // Try signin
    // Handle success by updating state
    // Handle failure by showing error message
  };
};

const signout = (dispatch) => {
  return () => {
    // Signout
  };
};

export const { Provider, Context } = CreateDataContext(
  authReducer,
  { signin, signup, signout },
  { token: null, errorMessage: '' }
);