import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./pages/app/Layout";
import SwipeView from "./pages/app/Swipe";
import MatchesView from "./pages/app/Matches";
import ChatsView from "./pages/app/Chats";
import ChatView from "./pages/app/ChatView";
import ProfileView from "./pages/app/Profile";
import SettingsView from "./pages/app/Settings";
import Index from "./pages/Index";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to /app for now since Index page is not ready */}
        <Route path="/" element={<Navigate to="/app" replace />} />
        
        {/* App routes with layout */}
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<SwipeView />} />
          <Route path="matches" element={<MatchesView />} />
          <Route path="chats" element={<ChatsView />} />
          <Route path="chats/:id" element={<ChatView />} />
          <Route path="profile" element={<ProfileView />} />
          <Route path="settings" element={<SettingsView />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;