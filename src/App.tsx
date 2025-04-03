import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
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
import BirthdayStep from "./pages/onboarding/BirthdayStep";
import GenderOrientationStep from "./pages/onboarding/GenderOrientationStep";
import { ChooseUsernameStep } from "./components/Onboarding/Steps/ChooseUsernameStep";

function AppContent() {
  const { isLoading, recoveryMode } = useAuth();
  const navigate = useNavigate();

  const handleOnboardingNext = (nextPath: string) => {
    navigate(nextPath);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (recoveryMode) {
    return <ResetPassword />;
  }

  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        
        {/* NEU: Onboarding-Routen (geschützt) */}
        <Route 
          path="/onboarding/birthday" 
          element={
            <ProtectedRoute>
              <BirthdayStep onNext={() => handleOnboardingNext('/onboarding/gender-orientation')} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/onboarding/gender-orientation" 
          element={
            <ProtectedRoute>
              <GenderOrientationStep onNext={() => handleOnboardingNext('/onboarding/username')} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/onboarding/username" 
          element={
            <ProtectedRoute>
              <ChooseUsernameStep onNext={() => handleOnboardingNext('/onboarding/looking-for')} />
            </ProtectedRoute>
          } 
        />
        {/* Hier kommen später die anderen Onboarding-Routen hin */}
        {/* 
        <Route path="/onboarding/looking-for" element={<ProtectedRoute><LookingForStep /></ProtectedRoute>} />
        <Route path="/onboarding/location" element={<ProtectedRoute><LocationStep /></ProtectedRoute>} />
        */}
        
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
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent /> 
      </AuthProvider>
    </Router>
  );
}

export default App;
