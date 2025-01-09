import { SwipeInterface } from "@/components/SwipeInterface";

const Index = () => {
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
          <p className="text-gray-600 max-w-md mx-auto">
            Join our community of verified users and find meaningful relationships
          </p>
        </header>
        
        <SwipeInterface />
      </div>
    </main>
  );
};

export default Index;