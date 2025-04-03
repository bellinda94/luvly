import React, { useState, useEffect } from 'react';
import { useOnboardingStore } from '@/stores/onboardingStore'; // Pfad anpassen!
import { Button } from '@/components/ui/button'; // Pfad anpassen!
import { Input } from '@/components/ui/input'; // Pfad anpassen!
import { Label } from '@/components/ui/label'; // Pfad anpassen!
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'; // Pfad anpassen!

// Props definieren (optional, aber gut für die Struktur)
interface ChooseUsernameStepProps {
  onNext: () => void;
  // onBack?: () => void; // Falls du einen Zurück-Button hast
}

// Validierungsfunktion (noch nicht vollständig implementiert)
const validateUsername = (name: string): { isValid: boolean; message?: string } => {
  const trimmedName = name.trim();

  if (trimmedName.length === 0) {
    // Verhindert leere Eingabe, aber wir brauchen Mindestlänge 3
    // Diese Prüfung ist Teil der Längenprüfung unten
  }
  if (trimmedName.length > 0 && name.trim() !== name) {
      // Verhindert reine Leerzeichen-Namen, falls trim() was entfernt hat
      // Besser: Direkt Länge von trimmedName prüfen
  }
  if (trimmedName.length < 3) {
      return { isValid: false, message: 'Muss mindestens 3 Zeichen lang sein.' };
  }
  if (trimmedName.length > 50) {
      return { isValid: false, message: 'Darf höchstens 50 Zeichen lang sein.' };
  }
  // Prüfung "nur Leerzeichen" ist durch trimmedName.length >= 3 abgedeckt
  // Wenn jemand "   " eingibt -> trimmedName.length ist 0 -> Fehler oben.

  return { isValid: true }; // Gültig
};


export const ChooseUsernameStep: React.FC<ChooseUsernameStepProps> = ({ onNext }) => {
  // Zustand aus dem Store holen
  const currentUsername = useOnboardingStore((state) => state.username);
  const setUsernameInStore = useOnboardingStore((state) => state.setUsername);

  // Lokaler State für das Input-Feld und Validierungsfehler
  const [localUsername, setLocalUsername] = useState(currentUsername);
  const [validationError, setValidationError] = useState<string | undefined>(undefined);
  const [isTouched, setIsTouched] = useState(false); // Um Fehler erst nach Interaktion anzuzeigen

  // Effekt, um bei Änderungen zu validieren
  useEffect(() => {
    if (!isTouched) return; // Nur validieren, wenn der Nutzer getippt hat

    const validationResult = validateUsername(localUsername);
    if (!validationResult.isValid) {
      setValidationError(validationResult.message);
    } else {
      setValidationError(undefined); // Kein Fehler
    }
  }, [localUsername, isTouched]);

  // Handler für Input-Änderungen
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsTouched(true); // Nutzer hat das Feld bearbeitet
    setLocalUsername(event.target.value);
  };

  // Handler für den Weiter-Button
  const handleNextClick = () => {
    setIsTouched(true); // Falls der Nutzer direkt klickt ohne zu tippen
    const validationResult = validateUsername(localUsername);
    if (validationResult.isValid) {
      setUsernameInStore(localUsername.trim()); // Wichtig: getrimmten Namen speichern
      onNext(); // Zum nächsten Schritt
    } else {
       setValidationError(validationResult.message); // Zeige Fehler an, falls noch nicht geschehen
    }
  };

  // Ist der Button aktiv? (Gültiger Name)
  const isNextDisabled = !validateUsername(localUsername).isValid;

  return (
    <Card className="w-full max-w-md mx-auto"> {/* Beispiel-Styling */}
      <CardHeader>
        <CardTitle>Wie möchtest du heissen?</CardTitle>
        <CardDescription>
          Dieser Name wird anderen in der App angezeigt. Du kannst auch Emojis verwenden! (Mind. 3, max. 50 Zeichen)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Benutzername</Label>
          <Input
            id="username"
            type="text"
            placeholder="Dein Benutzername"
            value={localUsername}
            onChange={handleInputChange}
            onBlur={() => setIsTouched(true)} // Fehler auch zeigen, wenn Feld verlassen wird
            aria-invalid={!!validationError} // Für Barrierefreiheit
            aria-describedby="username-error"
          />
          {isTouched && validationError && (
            <p id="username-error" className="text-sm text-red-600"> {/* Fehleranzeige */}
              {validationError}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        {/* <Button variant="outline" onClick={onBack}>Zurück</Button> // Falls benötigt */}
        <Button
           onClick={handleNextClick}
           disabled={isNextDisabled} // Button deaktivieren, wenn ungültig
           className="w-full" // Beispiel-Styling
         >
          Weiter
        </Button>
      </CardFooter>
    </Card>
  );
};
