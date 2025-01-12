import { Outlet, NavLink } from "react-router-dom";
import { Flame, MessageSquare, Star, UserRound, Settings } from "lucide-react";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-white">
      <div className="flex flex-col h-screen">
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
        
        <nav className="bg-white border-t border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex justify-around items-center h-16">
              <NavLink
                to="/app"
                end
                className={({ isActive }) =>
                  `flex flex-col items-center text-sm ${
                    isActive ? "text-primary" : "text-gray-500"
                  }`
                }
              >
                <Flame className="h-6 w-6" />
                <span>Entdecken</span>
              </NavLink>
              
              <NavLink
                to="/app/matches"
                className={({ isActive }) =>
                  `flex flex-col items-center text-sm ${
                    isActive ? "text-primary" : "text-gray-500"
                  }`
                }
              >
                <Star className="h-6 w-6" />
                <span>Matches</span>
              </NavLink>
              
              <NavLink
                to="/app/chats"
                className={({ isActive }) =>
                  `flex flex-col items-center text-sm ${
                    isActive ? "text-primary" : "text-gray-500"
                  }`
                }
              >
                <MessageSquare className="h-6 w-6" />
                <span>Chats</span>
              </NavLink>
              
              <NavLink
                to="/app/profile"
                className={({ isActive }) =>
                  `flex flex-col items-center text-sm ${
                    isActive ? "text-primary" : "text-gray-500"
                  }`
                }
              >
                <UserRound className="h-6 w-6" />
                <span>Profil</span>
              </NavLink>
              
              <NavLink
                to="/app/settings"
                className={({ isActive }) =>
                  `flex flex-col items-center text-sm ${
                    isActive ? "text-primary" : "text-gray-500"
                  }`
                }
              >
                <Settings className="h-6 w-6" />
                <span>Einstellungen</span>
              </NavLink>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default AppLayout;