// src/pages/onboarding/KidsWishStep.tsx

import React, { useState, useEffect } from 'react';
import { useOnboardingStore } from '@/stores/onboardingStore'; // Pfad anpassen!
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // Import für Radio Buttons
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Import für Dropdown
import { toast } from 'sonner';

// Definiere die Props, die die Komponente erwartet (die onNext Funktion)
interface KidsWishStepProps {
  onNext: () => void;
  // onBack?: () => void; // Optional: Falls es einen Zurück-Button gibt
}

// Optionen für die gewünschte Kinderanzahl (für das Dropdown)
const desiredCountOptions = [
  { value: '1', label: '1 Kind' },
  { value: '2', label: '2 Kinder' },
  { value: '3', label: '3 Kinder' },
  { value: '4', label: '4 Kinder' },
  { value: '5+', label: '5 oder mehr Kinder' },
  { value: 'unsure', label: 'Unsicher, aber mind. 1' },
];

export const KidsWishStep: React.FC<KidsWishStepProps> = ({ onNext }) => {
  // Zustand aus dem globalen Store holen
  const {
    has_children: storeHasChildren,
    children_count: storeChildrenCount,
    desired_children_count: storeDesiredCount,
    setHasChildren,
    setChildrenCount,
    setDesiredChildrenCount,
  } = useOnboardingStore();

  // Lokaler Zustand für die Formular-Eingaben
  // Wir verwenden string für RadioGroup und Select zur einfacheren Handhabung
  const [localHasChildren, setLocalHasChildren] = useState<string | null>(
    storeHasChildren === null ? null : String(storeHasChildren) // Konvertiere boolean|null zu string|null
  );
  const [localChildrenCount, setLocalChildrenCount] = useState<string>(
    storeChildrenCount === null ? '' : String(storeChildrenCount) // Konvertiere number|null zu string
  );
  const [localDesiredCount, setLocalDesiredCount] = useState<string | null>(storeDesiredCount); // string|null ist ok

  const [isChildrenCountValid, setIsChildrenCountValid] = useState(true); // Für Input-Validierung
  const [isFormValid, setIsFormValid] = useState(false); // Für Button-Deaktivierung

  // Effekt zur Validierung der Button-Aktivierung bei Änderungen
  useEffect(() => {
    const hasChildrenSelected = localHasChildren !== null;
    const childrenCountValid = localHasChildren !== 'true' || (parseInt(localChildrenCount, 10) >= 1 && /^\d+$/.test(localChildrenCount));
    const desiredCountSelected = localDesiredCount !== null && localDesiredCount !== '';

    setIsChildrenCountValid(childrenCountValid); // Aktualisiere Input-Validität
    setIsFormValid(hasChildrenSelected && childrenCountValid && desiredCountSelected);

  }, [localHasChildren, localChildrenCount, localDesiredCount]);


  // Handler für "Hast du Kinder?" RadioGroup
  const handleHasChildrenChange = (value: string) => {
    setLocalHasChildren(value);
    // Wenn "Nein" gewählt, Anzahl zurücksetzen
    if (value === 'false') {
      setLocalChildrenCount('');
    }
  };

  // Handler für "Anzahl Kinder" Input
  const handleChildrenCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Erlaube nur Ziffern oder leeren String
    if (/^\d*$/.test(value)) {
        setLocalChildrenCount(value);
    }
  };

  // Handler für "Gewünschte Anzahl" Select
  const handleDesiredCountChange = (value: string) => {
    setLocalDesiredCount(value);
  };

  // Handler für den Weiter-Button
  const handleNextClick = (e: React.FormEvent) => {
    e.preventDefault();

    // Erneute Validierung (Sicherheitsnetz)
    const hasChildrenSelected = localHasChildren !== null;
    const childrenCountValid = localHasChildren !== 'true' || (parseInt(localChildrenCount, 10) >= 1 && /^\d+$/.test(localChildrenCount));
    const desiredCountSelected = localDesiredCount !== null && localDesiredCount !== '';

    if (!hasChildrenSelected) {
        toast.error("Bitte gib an, ob du bereits Kinder hast.");
        return;
    }
    if (localHasChildren === 'true' && !childrenCountValid) {
        toast.error("Bitte gib eine gültige Anzahl (mindestens 1) für deine Kinder ein.");
        return;
    }
    if (!desiredCountSelected) {
        toast.error("Bitte wähle deine gewünschte zukünftige Kinderanzahl aus.");
        return;
    }

    // Daten konvertieren und im Store speichern
    const hasChildrenValue = localHasChildren === 'true';
    const childrenCountValue = hasChildrenValue ? parseInt(localChildrenCount, 10) : null;
    // Typ-Assertion, da wir wissen, dass es einer der gültigen Werte sein muss
    const desiredCountValue = localDesiredCount as '1' | '2' | '3' | '4' | '5+' | 'unsure' | null;

    setHasChildren(hasChildrenValue);
    setChildrenCount(childrenCountValue);
    setDesiredChildrenCount(desiredCountValue);

    // Zum nächsten Schritt navigieren
    onNext();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-secondary/30 to-white p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Schritt 3: Familienplanung</CardTitle>
          <CardDescription>Ein paar Fragen zu deiner aktuellen und zukünftigen Familiensituation.</CardDescription>
        </CardHeader>
        <form onSubmit={handleNextClick}>
          <CardContent className="space-y-6"> {/* Mehr Platz zwischen den Fragen */}
            {/* Frage 1: Hast du Kinder? */}
            <div className="space-y-3"> {/* Mehr Platz innen */}
              <Label>Hast du bereits Kinder?</Label>
              <RadioGroup
                value={localHasChildren ?? undefined} // Verwende undefined wenn null
                onValueChange={handleHasChildrenChange}
                className="flex space-x-4" // Horizontale Anordnung
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="hasChildrenYes" />
                  <Label htmlFor="hasChildrenYes">Ja</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="hasChildrenNo" />
                  <Label htmlFor="hasChildrenNo">Nein</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Frage 2: Wie viele? (Bedingt) */}
            {localHasChildren === 'true' && (
              <div className="space-y-2">
                <Label htmlFor="children-count">Wie viele Kinder hast du?</Label>
                <Input
                  id="children-count"
                  type="number" // Browser-Validierung nutzen
                  min="1"      // Mindestwert setzen
                  step="1"     // Nur ganze Zahlen
                  placeholder="Anzahl"
                  value={localChildrenCount}
                  onChange={handleChildrenCountChange}
                  required // Wird durch JS-Logik erzwungen, aber hilft dem Browser
                  className={!isChildrenCountValid && localChildrenCount !== '' ? 'border-red-500' : ''} // Fehler-Styling
                />
                {!isChildrenCountValid && localChildrenCount !== '' && (
                    <p className="text-sm text-red-600">Bitte gib eine gültige Zahl (mind. 1) ein.</p>
                )}
              </div>
            )}

            {/* Frage 3: Gewünschte Anzahl */}
            <div className="space-y-2">
              <Label htmlFor="desired-count-select">Wie viele Kinder wünschst du dir insgesamt?</Label>
              <Select
                 value={localDesiredCount ?? undefined} // Verwende undefined wenn null
                 onValueChange={handleDesiredCountChange}
                 required // Wichtig für Formular-Validierung
              >
                <SelectTrigger id="desired-count-select">
                  <SelectValue placeholder="Bitte auswählen..." />
                </SelectTrigger>
                <SelectContent>
                  {desiredCountOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            {/* Optional: Zurück-Button */}
            {/* <Button type="button" variant="outline" onClick={onBack}>Zurück</Button> */}
            <Button type="submit" className="w-full" disabled={!isFormValid}> {/* Button deaktivieren */}
              Weiter
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default KidsWishStep; // Standard-Export
