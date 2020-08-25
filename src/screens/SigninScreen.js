import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import SignupScreen from './SignupScreen';
import { Context } from '../context/AuthContext';

const SigninScreen = () => {
  const { state, signin, clearErrMsg } = useContext(Context);

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={clearErrMsg} />
      <AuthForm 
        headerText="Sign in to your account"
        errorMessage={state.errorMessage}
        onSubmitForm={signin}
        submitBtnText="Sign In"
      />
      <NavLink 
        routeName="Signup"
        text="Don't have an account? Sign up instead"
      />
    </View>
  )
}

SignupScreen.navigationOptions = {
   header: () => false
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 250
  }
})

export default SigninScreen;