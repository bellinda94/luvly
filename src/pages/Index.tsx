import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gradient-to-b from-secondary/30 to-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12 animate-slide-down">
          <div className="inline-block px-4 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            Find Your Perfect Match
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Authentic Connections
          </h1>
          <p className="text-gray-600 max-w-md mx-auto mb-8">
            Join our community of verified users and find meaningful relationships
          </p>
          
          <Button 
            onClick={() => navigate('/app')} 
            size="lg"
            className="animate-bounce"
          >
            Start Swiping
          </Button>
        </header>

        <div className="max-w-2xl mx-auto mt-16">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <h3 className="font-semibold">Verified Profiles</h3>
              <p className="text-sm text-gray-600">All our users are verified for your safety</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Smart Matching</h3>
              <p className="text-sm text-gray-600">Our algorithm finds your perfect match</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Real Connections</h3>
              <p className="text-sm text-gray-600">Meet people who share your interests</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Index;