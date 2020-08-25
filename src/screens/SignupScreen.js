import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SignupScreen = ({ navigation }) => {
  const { state, signup, clearErrorMsg } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={clearErrorMsg} />
      <AuthForm 
        headerText="Sing Up Track"
        errorMessage={state.errorMessage}
        onSubmitForm={signup}
        submitBtnText="Sign Up"
      />
      <NavLink 
        routeName="Signin"
        text="Already have an account? Sign in instead!"
      />
    </View>
  )
}

SignupScreen.navigationOptions = () => {
  return {
    headerShown: false
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 10,
    flex: 1,
    justifyContent: "center",
    marginBottom: 200
  }
})

export default SignupScreen;