import React, {useEffect, useRef, useState} from 'react';
import {Platform} from 'react-native';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import {Location} from '../../../interfaces/location';
import {FAB} from '../ui/FAB';
import {useLocationStore} from '../../store/location/useLocationStore';

interface Props {
  showsUserLocation?: boolean;
  initialLocation: Location;
}

export const Map = ({showsUserLocation = true, initialLocation}: Props) => {
  const mapRef = useRef<MapView>();
  const cameraLocation = useRef<Location>(initialLocation);
  const [isFollowingUser, setIsFollowingUser] = useState(true);
  const [isFollowingPolyline, setIsFollowingPolyline] = useState(true);

  const {
    getLocation,
    lastKnowLocation,
    watchLocation,
    clearWatchLocation,
    userLocationsList,
  } = useLocationStore();

  const moveCamaraToLocation = (location: Location) => {
    if (!mapRef.current) return;

    mapRef.current.animateCamera({
      center: location,
    });
  };

  const moveToCurrentLocation = async () => {
    if (!lastKnowLocation) {
      moveCamaraToLocation(initialLocation);
    }
    const location = await getLocation();

    if (!location) return;

    moveCamaraToLocation(location);
  };

  useEffect(() => {
    watchLocation();

    return () => {
      clearWatchLocation();
    };
  }, []);

  useEffect(() => {
    if (lastKnowLocation && isFollowingUser) {
      moveCamaraToLocation(lastKnowLocation);
    }
  }, [lastKnowLocation, isFollowingUser]);

  return (
    <>
      <MapView
        ref={map => (mapRef.current = map!)}
        showsUserLocation={showsUserLocation}
        provider={Platform.OS === 'ios' ? undefined : PROVIDER_GOOGLE} // remove if not using Google Maps
        style={{flex: 1}}
        onTouchStart={() => setIsFollowingUser(false)}
        region={{
          latitude: cameraLocation.current.latitude,
          longitude: cameraLocation.current.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        {isFollowingPolyline && (
          <Polyline
            coordinates={userLocationsList}
            strokeColor="black"
            strokeWidth={5}
          />
        )}
        {/* Marcador */}
        {/*       <Marker
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          title='Titulo del marcador'
          description='Descripcion'
          image={require("../../../assets/custom-marker.png")}
        /> */}
      </MapView>
      <FAB
        iconName={isFollowingPolyline ? 'eye-outline' : 'eye-off-outline'}
        onPress={() => setIsFollowingPolyline(!isFollowingPolyline)}
        style={{bottom: 140, right: 20}}
      />

      <FAB
        iconName={isFollowingUser ? 'walk-outline' : 'accessibility-outline'}
        onPress={() => setIsFollowingUser(!isFollowingUser)}
        style={{bottom: 80, right: 20}}
      />

      <FAB
        iconName="compass-outline"
        onPress={moveToCurrentLocation}
        style={{bottom: 20, right: 20}}
      />
    </>
  );
};
