import React, {useEffect, useRef} from 'react';
import {Platform} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
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
  const {getLocation, lastKnowLocation, watchLocation, clearWatchLocation} =
    useLocationStore();

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
    if (lastKnowLocation) {
      moveCamaraToLocation(lastKnowLocation);
    }
  }, [lastKnowLocation]);

  return (
    <>
      <MapView
        ref={map => (mapRef.current = map!)}
        showsUserLocation={showsUserLocation}
        provider={Platform.OS === 'ios' ? undefined : PROVIDER_GOOGLE} // remove if not using Google Maps
        style={{flex: 1}}
        region={{
          latitude: cameraLocation.current.latitude,
          longitude: cameraLocation.current.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
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
        iconName="compass-outline"
        onPress={moveToCurrentLocation}
        style={{bottom: 20, right: 20}}
      />
    </>
  );
};
