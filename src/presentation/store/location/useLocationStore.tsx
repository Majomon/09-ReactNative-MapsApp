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
  userLocationsList: Location[];
  watchId: number | null;

  getLocation: () => Promise<Location | null>;
  watchLocation: () => void;
  clearWatchLocation: () => void;
}

export const useLocationStore = create<LocationState>()((set, get) => ({
  lastKnowLocation: null,
  userLocationsList: [],
  watchId: null,

  getLocation: async () => {
    const location = await getCurrentLocation();
    set({lastKnowLocation: location});
    return location;
  },

  watchLocation: async () => {
    const watchId = get().watchId;
    if (watchId !== null) {
      get().clearWatchLocation();
    }

    const id = watchCurrentLocation(location => {
      set({
        lastKnowLocation: location,
        userLocationsList: [...get().userLocationsList, location],
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
