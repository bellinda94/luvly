import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Import Select
import { Label } from '@/components/ui/label'; // Import Label
import { toast } from 'sonner';

// Beispieloptionen - diese sollten idealerweise aus einer Konfiguration oder API kommen
const genderOptions = ['Männlich', 'Weiblich', 'Divers', 'Nicht angegeben'];
const orientationOptions = ['Heterosexuell', 'Homosexuell', 'Bisexuell', 'Pansexuell', 'Asexuell', 'Andere', 'Nicht angegeben'];

const GenderOrientationStep = () => {
  const navigate = useNavigate();
  const { gender, orientation, setGender, setOrientation } = useOnboardingStore();
  const [localGender, setLocalGender] = useState(gender || '');
  const [localOrientation, setLocalOrientation] = useState(orientation || '');

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!localGender || !localOrientation) {
      toast.error('Bitte wähle dein Geschlecht und deine sexuelle Orientierung aus.');
      return;
    }
    
    setGender(localGender);
    setOrientation(localOrientation);
    navigate('/onboarding/looking-for'); // Navigiere zum nächsten Schritt
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-secondary/30 to-white p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Schritt 2: Über dich</CardTitle>
          <CardDescription>Bitte gib dein Geschlecht und deine sexuelle Orientierung an.</CardDescription>
        </CardHeader>
        <form onSubmit={handleNext}>
          <CardContent className="space-y-4">
            {/* Geschlecht Auswahl */}
            <div className="space-y-2">
              <Label htmlFor="gender-select">Geschlecht</Label>
              <Select value={localGender} onValueChange={setLocalGender} required>
                <SelectTrigger id="gender-select">
                  <SelectValue placeholder="Wähle dein Geschlecht" />
                </SelectTrigger>
                <SelectContent>
                  {genderOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sexuelle Orientierung Auswahl */}
            <div className="space-y-2">
              <Label htmlFor="orientation-select">Sexuelle Orientierung</Label>
              <Select value={localOrientation} onValueChange={setLocalOrientation} required>
                <SelectTrigger id="orientation-select">
                  <SelectValue placeholder="Wähle deine Orientierung" />
                </SelectTrigger>
                <SelectContent>
                  {orientationOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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

export default GenderOrientationStep;
