import {
    check,
  openSettings,
  PERMISSIONS,
  request,
  PermissionStatus as RNPermissionStatus,
} from 'react-native-permissions';
import type {PermissionStatus} from '../../interfaces/permissions';
import {Platform} from 'react-native';

export const requestLocationPermission =
  async (): Promise<PermissionStatus> => {
    let status: RNPermissionStatus = 'unavailable';

    if (Platform.OS === 'ios') {
      status = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else if (Platform.OS === 'android') {
      status = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    } else {
      /*  return 'unavailable'; */
      throw new Error('PLataforma no soportada');
    }

    if (status === 'blocked') {
      //Abre las settins del dispositivo
      await openSettings();
    }

    const permissionMapper: Record<RNPermissionStatus, PermissionStatus> = {
      granted: 'granted',
      denied: 'denied',
      blocked: 'denied',
      unavailable: 'unavailable',
      limited: 'limited',
    };

    return permissionMapper[status] ?? 'undetermined';

  };


  export const checkLocationPermission= async():Promise<PermissionStatus>=>{
    
    let status: RNPermissionStatus = 'unavailable';

    if (Platform.OS === 'ios') {
        status = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      } else if (Platform.OS === 'android') {
        status = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      } else {
        /*  return 'unavailable'; */
        throw new Error('PLataforma no soportada');
      }
      
      const permissionMapper: Record<RNPermissionStatus, PermissionStatus> = {
        granted: 'granted',
        denied: 'denied',
        blocked: 'denied',
        unavailable: 'unavailable',
        limited: 'limited',
      };
  
      return permissionMapper[status] ?? 'undetermined';
  }