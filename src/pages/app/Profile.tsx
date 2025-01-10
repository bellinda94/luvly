import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Edit } from "lucide-react";

const ProfileView = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Dein Profil</CardTitle>
            <Button variant="outline" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative mx-auto w-32 h-32">
            <img
              src="/placeholder.svg"
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
            <Button
              variant="secondary"
              size="icon"
              className="absolute bottom-0 right-0 rounded-full"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900">Name</h3>
              <p className="text-gray-600">Max Mustermann</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900">Über mich</h3>
              <p className="text-gray-600">
                Ich liebe es neue Menschen kennenzulernen und spannende Gespräche zu führen.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900">Interessen</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {["Reisen", "Musik", "Sport", "Kochen"].map((interest) => (
                  <span
                    key={interest}
                    className="px-3 py-1 bg-secondary rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileView;