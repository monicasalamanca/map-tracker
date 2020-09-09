import * as Location from 'expo-location';

const tenMetersWithDegrees = 0.0001;

const getLocation = increment => {
  return {
    timestamp: 10000000,
    coords: {
      speed: 0,
      heading: 0,
      accuracy: 11.468999862670898,
      altitudeAccuracy: 5,
      altitude: 47.5,
      longitude: -73.6239415 + increment * tenMetersWithDegrees,
      latitude: 45.4788476 + increment * tenMetersWithDegrees 
    }
  };
};

let counter = 0;
setInterval(() => {
  Location.EventEmitter.emit('Expo.locationChanged', {
    watchId: Location._getCurrentWatchId(),
    location: getLocation(counter)
  });
  counter++;
}, 1000);