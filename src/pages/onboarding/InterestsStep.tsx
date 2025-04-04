// src/pages/onboarding/InterestsStep.tsx

import React, { useState, useEffect } from 'react';
import { useOnboardingStore } from '@/stores/onboardingStore'; // Pfad anpassen!
import { availableInterests } from '@/config/interests';      // Pfad anpassen!
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

// Definiere die Props (onNext Funktion)
interface InterestsStepProps {
  onNext: () => void;
  // onBack?: () => void; // Optional für Zurück-Button
}

// Mindestanzahl der auszuwählenden Interessen
const MIN_REQUIRED_INTERESTS = 5;

export const InterestsStep: React.FC<InterestsStepProps> = ({ onNext }) => {
  // Zustand aus dem globalen Store holen
  const { interests: storeInterests, setInterests } = useOnboardingStore();

  // Lokaler Zustand für die aktuell ausgewählten Interessen
  const [selectedInterests, setSelectedInterests] = useState<string[]>(storeInterests || []);

  // Zustandsvariable für die Gültigkeit des Formulars (Button-Deaktivierung)
  const [isSelectionValid, setIsSelectionValid] = useState(false);

  // Effekt, um die Gültigkeit bei jeder Änderung der Auswahl zu prüfen
  useEffect(() => {
    setIsSelectionValid(selectedInterests.length >= MIN_REQUIRED_INTERESTS);
  }, [selectedInterests]);

  // Handler zum Hinzufügen/Entfernen eines Interesses
  const handleInterestToggle = (interest: string) => {
    setSelectedInterests((prevSelected) =>
      prevSelected.includes(interest)
        ? prevSelected.filter((item) => item !== interest) // Entfernen
        : [...prevSelected, interest] // Hinzufügen
    );
  };

  // Handler für den Weiter-Button
  const handleNextClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSelectionValid) {
      toast.error(`Bitte wähle mindestens ${MIN_REQUIRED_INTERESTS} Interessen aus.`);
      return;
    }
    // Im globalen Store speichern
    setInterests(selectedInterests);
    // Zum nächsten Schritt navigieren
    onNext();
  };

  const currentCount = selectedInterests.length;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-secondary/30 to-white p-4">
      <Card className="w-full max-w-lg"> {/* Etwas breiter für mehr Platz */}
        <CardHeader>
          <CardTitle>Schritt 4: Deine Interessen</CardTitle>
          <CardDescription>
            Wähle mindestens {MIN_REQUIRED_INTERESTS} Interessen aus, die dich am besten beschreiben.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleNextClick}>
          <CardContent>
            <div className="flex flex-wrap gap-2 justify-center"> {/* Zentriert und mit Lücken */}
              {availableInterests.map((interest) => {
                const isSelected = selectedInterests.includes(interest);
                return (
                  <Button
                    key={interest}
                    type="button" // Wichtig, damit das Formular nicht abgeschickt wird
                    variant={isSelected ? 'default' : 'outline'} // Visuelles Feedback
                    size="sm" // Kleinere Buttons
                    onClick={() => handleInterestToggle(interest)}
                    className={`rounded-full h-auto px-4 py-1 text-sm transition-colors duration-150 ${isSelected ? 'shadow-md' : ''}`} // Abgerundet, passendes Padding/Textgrösse
                  >
                    {interest}
                  </Button>
                );
              })}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            {/* Optional: Zurück-Button */}
            {/* <Button type="button" variant="outline" onClick={onBack}>Zurück</Button> */}
            <span className="text-sm text-muted-foreground">
              {currentCount}/{MIN_REQUIRED_INTERESTS} ausgewählt
            </span>
            <Button type="submit" disabled={!isSelectionValid}>
              Weiter
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default InterestsStep; // Standard-Export
