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
  username: string;
  has_children: boolean | null;          // Hast du bereits Kinder?
  children_count: number | null;         // Wie viele Kinder hast du? (Nur wenn has_children=true)
  desired_children_count: '1' | '2' | '3' | '4' | '5+' | 'unsure' | null; // Gewünschte Anzahl
  interests: string[];
  drinking_habit: string | null;
  smoking_habit: string | null;
  exercise_frequency: string | null;
  pet_preference: string | null;

  // Funktionen zum Aktualisieren des Zustands
  setBirthday: (birthday: string) => void;
  setGender: (gender: string) => void;
  setOrientation: (orientation: string) => void;
  setLookingFor: (lookingFor: string[]) => void;
  setLocationPreference: (preference: string) => void;
  setSearchRadius: (radius: number) => void;
  setSearchRegion: (region: string) => void;
  setUsername: (username: string) => void;
  setHasChildren: (has: boolean | null) => void;
  setChildrenCount: (count: number | null) => void;
  setDesiredChildrenCount: (desired: '1' | '2' | '3' | '4' | '5+' | 'unsure' | null) => void;
  setInterests: (interests: string[]) => void;
  setDrinkingHabit: (habit: string | null) => void;
  setSmokingHabit: (habit: string | null) => void;
  setExerciseFrequency: (frequency: string | null) => void;
  setPetPreference: (preference: string | null) => void;
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
  username: '',
  has_children: null,
  children_count: null,
  desired_children_count: null,
  interests: [],
  drinking_habit: null,
  smoking_habit: null,
  exercise_frequency: null,
  pet_preference: null,

  // Updater-Funktionen
  setBirthday: (birthday) => set({ birthday }),
  setGender: (gender) => set({ gender }),
  setOrientation: (orientation) => set({ orientation }),
  setLookingFor: (lookingFor) => set({ lookingFor }),
  setLocationPreference: (preference) => set({ locationPreference: preference }),
  setSearchRadius: (radius) => set({ searchRadius: radius }),
  setSearchRegion: (region) => set({ searchRegion: region }),
  setUsername: (username) => set({ username }),
  setHasChildren: (has) => set((state) => {
    // Wenn User angibt, keine Kinder zu haben, setzen wir die Anzahl auf null zurück
    const count = has === false ? null : state.children_count;
    return { has_children: has, children_count: count };
  }),
  setChildrenCount: (count) => set({ children_count: count }),
  setDesiredChildrenCount: (desired) => set({ desired_children_count: desired }),
  setInterests: (interests) => set({ interests }),
  setDrinkingHabit: (habit) => set({ drinking_habit: habit }),
  setSmokingHabit: (habit) => set({ smoking_habit: habit }),
  setExerciseFrequency: (frequency) => set({ exercise_frequency: frequency }),
  setPetPreference: (preference) => set({ pet_preference: preference }),
  resetOnboardingState: () => set({
    birthday: null,
    gender: null,
    orientation: null,
    lookingFor: null,
    locationPreference: null,
    searchRadius: null,
    searchRegion: null,
    username: '',
    has_children: null,
    children_count: null,
    desired_children_count: null,
    interests: [],
    drinking_habit: null,
    smoking_habit: null,
    exercise_frequency: null,
    pet_preference: null,
  }),
}));
