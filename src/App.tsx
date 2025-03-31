import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./pages/app/Layout";
import SwipeView from "./pages/app/Swipe";
import MatchesView from "./pages/app/Matches";
import ChatsView from "./pages/app/Chats";
import ChatView from "./pages/app/ChatView";
import ProfileView from "./pages/app/Profile";
import SettingsView from "./pages/app/Settings";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "sonner";
import ResetPassword from "./pages/ResetPassword";

function AppContent() {
  const { isLoading, recoveryMode } = useAuth();

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (recoveryMode) {
    return <ResetPassword />;
  }

  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        
        {/* Protected app routes */}
        <Route 
          path="/app" 
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<SwipeView />} />
          <Route path="matches" element={<MatchesView />} />
          <Route path="chats" element={<ChatsView />} />
          <Route path="chats/:id" element={<ChatView />} />
          <Route path="profile" element={<ProfileView />} />
          <Route path="settings" element={<SettingsView />} />
        </Route>
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent /> 
    </AuthProvider>
  );
}

export default App;
