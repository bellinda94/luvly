import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface BirthdayStepProps {
  onNext: () => void;
}

const BirthdayStep: React.FC<BirthdayStepProps> = ({ onNext }) => {
  const navigate = useNavigate();
  const { birthday, setBirthday } = useOnboardingStore();
  const [localBirthday, setLocalBirthday] = useState(birthday || '');

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!localBirthday) {
      toast.error('Bitte gib dein Geburtsdatum ein.');
      return;
    }
    // Einfache Validierung (nur Prüfung ob nicht leer) - Bessere Validierung wäre gut
    // TODO: Füge eine robustere Datumsvalidierung hinzu (Format, Gültigkeit, Mindestalter)
    
    setBirthday(localBirthday);
    onNext(); // Navigiere zum nächsten Schritt
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-secondary/30 to-white p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Schritt 1: Dein Geburtstag</CardTitle>
          <CardDescription>Bitte gib dein Geburtsdatum an.</CardDescription>
        </CardHeader>
        <form onSubmit={handleNext}>
          <CardContent>
            <Input
              type="date" // Einfaches Datums-Input
              value={localBirthday}
              onChange={(e) => setLocalBirthday(e.target.value)}
              required
              // Optional: max-Attribut setzen, um zukünftige Daten zu verhindern
              // max={new Date().toISOString().split('T')[0]} 
            />
            {/* Hier könnte man noch einen Date-Picker einbauen für bessere UX */}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Weiter
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default BirthdayStep;
