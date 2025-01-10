import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Shield, User, MapPin } from "lucide-react";

const SettingsView = () => {
  const settingsGroups = [
    {
      title: "Account",
      items: [
        { icon: User, label: "Profil bearbeiten" },
        { icon: Shield, label: "Privatsphäre" },
      ],
    },
    {
      title: "Präferenzen",
      items: [
        { icon: MapPin, label: "Standort" },
        { icon: Bell, label: "Benachrichtigungen" },
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">Einstellungen</h2>
      <div className="space-y-6 max-w-xl mx-auto">
        {settingsGroups.map((group) => (
          <Card key={group.title}>
            <CardHeader>
              <CardTitle className="text-lg">{group.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {group.items.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  className="w-full justify-start h-12"
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              ))}
            </CardContent>
          </Card>
        ))}
        
        <Button
          variant="destructive"
          className="w-full mt-6"
        >
          Abmelden
        </Button>
      </div>
    </div>
  );
};

export default SettingsView;