// src/pages/onboarding/LifestyleStep.tsx

import React, { useState, useEffect } from 'react';
import { useOnboardingStore } from '@/stores/onboardingStore'; // Pfad anpassen!
import {
  drinkingOptions,
  smokingOptions,
  exerciseOptions,
  petOptions,
} from '@/config/lifestyleOptions'; // Pfad anpassen!
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label'; // Wird für die Gruppen-Labels benötigt
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator'; // Zum Trennen der Abschnitte

// Definiere die Props (onNext Funktion)
interface LifestyleStepProps {
  onNext: () => void;
  // onBack?: () => void; // Optional für Zurück-Button
}

// Props für die wiederverwendbare Optionsgruppe
interface OptionGroupProps {
  label: string;
  options: string[];
  selectedValue: string | null;
  onValueChange: (value: string) => void;
  icon?: React.ReactNode; // Optional: Icon für die Gruppe
}

// Wiederverwendbare Komponente für eine Optionsgruppe (Pill-Auswahl)
const OptionGroup: React.FC<OptionGroupProps> = ({ label, options, selectedValue, onValueChange, icon }) => {
  return (
    <div className="space-y-3">
        <div className="flex items-center space-x-2">
            {icon}
            <Label className="text-base font-medium">{label}</Label> {/* Label für die Gruppe */}
        </div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selectedValue === option;
          return (
            <Button
              key={option}
              type="button" // Wichtig!
              variant={isSelected ? 'default' : 'outline'}
              size="sm"
              onClick={() => onValueChange(option)}
              className={`rounded-full h-auto px-4 py-1 text-sm transition-colors duration-150 ${isSelected ? 'shadow-md' : ''}`}
            >
              {option}
            </Button>
          );
        })}
      </div>
    </div>
  );
};


export const LifestyleStep: React.FC<LifestyleStepProps> = ({ onNext }) => {
  // Zustand aus dem globalen Store holen
  const {
    drinking_habit: storeDrinking,
    smoking_habit: storeSmoking,
    exercise_frequency: storeExercise,
    pet_preference: storePets,
    setDrinkingHabit,
    setSmokingHabit,
    setExerciseFrequency,
    setPetPreference,
  } = useOnboardingStore();

  // Lokaler Zustand für die ausgewählten Werte
  const [localDrinking, setLocalDrinking] = useState<string | null>(storeDrinking);
  const [localSmoking, setLocalSmoking] = useState<string | null>(storeSmoking);
  const [localExercise, setLocalExercise] = useState<string | null>(storeExercise);
  const [localPets, setLocalPets] = useState<string | null>(storePets);

  const [isFormValid, setIsFormValid] = useState(false);

  // Effekt zur Validierung (alle 4 Fragen müssen beantwortet sein)
  useEffect(() => {
    setIsFormValid(
      localDrinking !== null &&
      localSmoking !== null &&
      localExercise !== null &&
      localPets !== null
    );
  }, [localDrinking, localSmoking, localExercise, localPets]);

  // Handler für den Weiter-Button
  const handleNextClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      toast.error("Bitte beantworte alle Fragen zu deinem Lifestyle.");
      return;
    }
    // Im globalen Store speichern
    setDrinkingHabit(localDrinking);
    setSmokingHabit(localSmoking);
    setExerciseFrequency(localExercise);
    setPetPreference(localPets);
    // Zum nächsten Schritt navigieren
    onNext();
  };

  const questionsAnswered = [localDrinking, localSmoking, localExercise, localPets].filter(v => v !== null).length;
  const totalQuestions = 4;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-secondary/30 to-white p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Schritt 5: Dein Lifestyle</CardTitle> {/* Namen anpassen ggf. */}
          <CardDescription>
            Passen eure Lifestyles zueinander? Lass uns ein paar Details klären.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleNextClick}>
          <CardContent className="space-y-6">
            {/* Alkohol */}
            <OptionGroup
              label="Trinkst du Alkohol?"
              options={drinkingOptions}
              selectedValue={localDrinking}
              onValueChange={setLocalDrinking}
              // Optional: Icon (Beispiel mit Platzhalter, du müsstest Icons importieren/verwenden)
              // icon={<DrinkIcon className="h-5 w-5 text-muted-foreground" />}
            />
            <Separator /> {/* Trennlinie */}

            {/* Rauchen */}
            <OptionGroup
              label="Wie oft rauchst du?"
              options={smokingOptions}
              selectedValue={localSmoking}
              onValueChange={setLocalSmoking}
              // icon={<SmokingIcon />}
            />
            <Separator />

            {/* Training */}
            <OptionGroup
              label="Trainierst du?"
              options={exerciseOptions}
              selectedValue={localExercise}
              onValueChange={setLocalExercise}
              // icon={<ExerciseIcon />}
            />
            <Separator />

             {/* Haustiere */}
             <OptionGroup
              label="Hast du Haustiere?"
              options={petOptions}
              selectedValue={localPets}
              onValueChange={setLocalPets}
              // icon={<PetIcon />}
            />

          </CardContent>
          <CardFooter className="flex justify-between items-center">
            {/* Optional: Zurück-Button */}
            {/* <Button type="button" variant="outline" onClick={onBack}>Zurück</Button> */}
             <span className="text-sm text-muted-foreground">
              {questionsAnswered}/{totalQuestions} beantwortet
            </span>
            <Button type="submit" disabled={!isFormValid}>
              Weiter
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LifestyleStep;
