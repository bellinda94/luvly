import { SwipeInterface } from "@/components/SwipeInterface";

const App = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-secondary/30 to-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Swipe Connect
          </h1>
        </header>
        
        <SwipeInterface />
      </div>
    </main>
  );
};

export default App;