import React from 'react';
import {Pressable, Text, View} from 'react-native';
import { globalStyles } from '../../../config/globalStyles';
import { usePermissionStore } from '../../store/permissions/usePermissionStore';

export const PermissionsScreen = () => {
  const {locationStatus, requestLocationPermission}= usePermissionStore()
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>PermissionsScreen</Text>

      <Pressable style={globalStyles.btnPrimarty} onPress={requestLocationPermission}>
        <Text style={{color:"white"}}>Habilitar localización</Text>
      </Pressable>

      <Text>Estado actual: {locationStatus} </Text>
    </View>
  );
};
