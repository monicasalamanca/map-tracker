import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

const SignupScreen = ({ navigation }) => {
  return <>
    <Text styles={{ fontSize: 48 }}>SignupScreen</Text>
    <Button title="Go to signin" onPress={() => navigation.navigate('Signin')}></Button>
    <Button title="Go to Main Flow" onPress={() => navigation.navigate('mainFlow')}></Button>
  </>
}

const styles = StyleSheet.create({})

export default SignupScreen;