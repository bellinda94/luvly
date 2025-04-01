import { create } from 'zustand';

// Definiere die Struktur der Daten, die wir sammeln wollen
interface OnboardingState {
  birthday: string | null;
  gender: string | null;
  orientation: string | null;
  lookingFor: string[] | null; // Kann mehrere Optionen enthalten
  locationPreference: string | null; // z.B. 'radius' oder 'region'
  searchRadius: number | null; // in km
  searchRegion: string | null;
  // Füge hier bei Bedarf weitere Felder hinzu

  // Funktionen zum Aktualisieren des Zustands
  setBirthday: (birthday: string) => void;
  setGender: (gender: string) => void;
  setOrientation: (orientation: string) => void;
  setLookingFor: (lookingFor: string[]) => void;
  setLocationPreference: (preference: string) => void;
  setSearchRadius: (radius: number) => void;
  setSearchRegion: (region: string) => void;
  resetOnboardingState: () => void;
}

// Erstelle den Zustandsspeicher
export const useOnboardingStore = create<OnboardingState>((set) => ({
  // Initialwerte
  birthday: null,
  gender: null,
  orientation: null,
  lookingFor: null,
  locationPreference: null,
  searchRadius: null,
  searchRegion: null,

  // Updater-Funktionen
  setBirthday: (birthday) => set({ birthday }),
  setGender: (gender) => set({ gender }),
  setOrientation: (orientation) => set({ orientation }),
  setLookingFor: (lookingFor) => set({ lookingFor }),
  setLocationPreference: (preference) => set({ locationPreference: preference }),
  setSearchRadius: (radius) => set({ searchRadius: radius }),
  setSearchRegion: (region) => set({ searchRegion: region }),
  resetOnboardingState: () => set({
    birthday: null,
    gender: null,
    orientation: null,
    lookingFor: null,
    locationPreference: null,
    searchRadius: null,
    searchRegion: null,
  }),
}));
