import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StackNavigator} from './navigation/StackNavigator';
import {PermissionsCheker} from './providers/PermissionsCheker';

export const MapsApp = () => {
  return (
    <NavigationContainer>
      <PermissionsCheker>
        <StackNavigator />
      </PermissionsCheker>
    </NavigationContainer>
  );
};
