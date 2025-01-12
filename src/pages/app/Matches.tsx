import { Card } from "@/components/ui/card";

const MatchesView = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">0 Likes</h2>
        <h2 className="text-2xl font-bold text-gray-500">Top-Picks</h2>
      </div>
      
      <div className="text-center py-8">
        <h3 className="text-xl font-semibold mb-4">
          Mit einem Upgrade auf Gold siehst du Leute, die dir schon ein Like gegeben haben.
        </h3>
        
        <div className="relative w-64 h-64 mx-auto mb-8">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
              alt="Blurred profile"
              className="w-full h-full object-cover rounded-lg filter blur-sm"
            />
          </div>
          <div className="absolute bottom-4 left-4 flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span className="text-white text-sm">Kürzlich aktiv</span>
          </div>
        </div>

        <button className="bg-yellow-500 text-black font-semibold py-3 px-8 rounded-full hover:bg-yellow-400 transition-colors">
          Finde heraus, wer dich mag
        </button>
      </div>
    </div>
  );
};

export default MatchesView;