import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';

const SignupScreen = ({ navigation }) => {
  const { state, signup } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <AuthForm 
        headerText="Sing Up Track"
        errorMessage={state.errorMessage}
        onSubmitForm={signup}
        submitBtnText="Sign Up"
      />
      <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
        <Spacer>
          <Text style={styles.link}>Already have an account? Sign in instead</Text>
        </Spacer>
      </TouchableOpacity>
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
  },
  link: {
    color: 'blue'
  }
})

export default SignupScreen;