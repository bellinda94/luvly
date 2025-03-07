
import { SwipeInterface } from "@/components/SwipeInterface";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user } = useAuth();
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-secondary/30 to-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12 animate-slide-down">
          <div className="flex justify-end mb-4">
            {user ? (
              <Button asChild>
                <Link to="/app">Zur App</Link>
              </Button>
            ) : (
              <Button asChild>
                <Link to="/auth">Anmelden</Link>
              </Button>
            )}
          </div>
          
          <div className="inline-block px-4 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            Finde deine perfekte Übereinstimmung
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Entdecke authentische Verbindungen
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Tritt unserer Community aus verifizierten Nutzern bei und finde bedeutungsvolle Beziehungen
          </p>
        </header>
        
        <SwipeInterface />
      </div>
    </main>
  );
};

export default Index;
