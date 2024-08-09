import Geolocation from '@react-native-community/geolocation';
import {Location} from '../../interfaces/location';

export const getCurrentLocation = async (): Promise<Location> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      info => {
        resolve({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        });
      },
      error => {
        console.log('No se pudo obtener la localización');
        reject(error);
      },
      {
        enableHighAccuracy: true,
      },
    );
  });
};

export const watchCurrentLocation = (
  locationCallBack: (location: Location) => void,
): number => {
  return Geolocation.watchPosition(
    info =>
      locationCallBack({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
      }),
    error => {
      console.log(error);
      throw new Error(`Can't get watchPosition`);
    },
    {
      enableHighAccuracy: true,
    },
  );
};

export const clearWatchLocation = (watchId: number) => {
  Geolocation.clearWatch(watchId);
};
