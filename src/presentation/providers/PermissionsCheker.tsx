import React, {PropsWithChildren, useEffect} from 'react';
import {AppState} from 'react-native';
import {usePermissionStore} from '../store/permissions/usePermissionStore';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../navigation/StackNavigator';

export const PermissionsCheker = ({children}: PropsWithChildren) => {
  const {locationStatus, checkLocationPermission} = usePermissionStore();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  useEffect(() => {
    if (locationStatus === 'granted') {
      navigation.navigate('MapsScreen');
    } else if (locationStatus !== 'undetermined') {
      navigation.navigate('PermissionsScreen');
    }
  }, [locationStatus]);

  useEffect(() => {
    checkLocationPermission();
  });

  useEffect(() => {
    const suscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        checkLocationPermission();
      }
    });

    return () => {
      suscription.remove();
    };
  }, []);

  return <>{children}</>;
};
