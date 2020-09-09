import '../_mockLocation';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet } from 'react-native';
import Map from '../components/Map';
import { Text } from 'react-native-elements';
import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location';
import { SafeAreaView } from 'react-navigation';
import { Context as LocationContext } from '../context/LocationContext';

const TrackCreateScreen = () => {
  const { addLocation } = useContext(LocationContext);
  const [err, setErr] = useState(null);

  const startWatching = async () => {
    try {
      const { granted } = await requestPermissionsAsync();
      if (!granted) {
        throw new Error('Location permission not granted');
      }
      await watchPositionAsync({
        accuracy: Accuracy.BestForNavigation,
        timeInterval: 1000,
        distanceInterval: 10
      }, (location) => {
        // console.log(location);
        addLocation(location);
      })
    } catch (e) {
      setErr(e)
    }
  }

  useEffect(() => {
    startWatching();
  }, [])

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Text h2>Create a Track</Text>
      <Map />
      { err ? <Text>Please enable location services</Text> : null }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({});

export default TrackCreateScreen;