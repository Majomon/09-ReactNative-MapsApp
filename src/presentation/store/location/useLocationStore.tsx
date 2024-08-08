import { create } from 'zustand';
import { getCurrentLocation } from '../../../actions/location/location';
import { Location } from '../../../interfaces/location';

interface LocationState {
  /* Ultima ubicacion conocida del usuario */
  lastKnowLocation: Location | null;

  getLocation: () => Promise<Location | null>;
}

export const useLocationStore = create<LocationState>()((set, get) => ({
  lastKnowLocation: null,
  getLocation: async () => {
    const location = await getCurrentLocation();
    set({lastKnowLocation: location});
    return location;
  },
}));
