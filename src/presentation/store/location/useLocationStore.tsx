import {create} from 'zustand';
import {
  clearWatchLocation,
  getCurrentLocation,
  watchCurrentLocation,
} from '../../../actions/location/location';
import {Location} from '../../../interfaces/location';

interface LocationState {
  /* Ultima ubicacion conocida del usuario */
  lastKnowLocation: Location | null;
  userLocations: Location[];
  watchId: number | null;

  getLocation: () => Promise<Location | null>;
  watchLocation: () => void;
  clearWatchLocation: () => void;
}

export const useLocationStore = create<LocationState>()((set, get) => ({
  lastKnowLocation: null,
  userLocations: [],
  watchId: null,

  getLocation: async () => {
    const location = await getCurrentLocation();
    set({lastKnowLocation: location});
    return location;
  },

  watchLocation: () => {
    const watchId = get().watchId;
    if (watchId !== null) {
      get().clearWatchLocation();
    }

    const id = watchCurrentLocation(location => {
      set({
        lastKnowLocation: location,
        userLocations: [...get().userLocations, location],
      });
    });

    set({watchId: id});
  },

  clearWatchLocation: () => {
    const watchId = get().watchId;
    if (watchId !== null) {
      clearWatchLocation(watchId);
    }
  },
}));
