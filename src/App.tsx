import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import AppLayout from "./pages/app/Layout";
import SwipeView from "./pages/app/Swipe";
import MatchesView from "./pages/app/Matches";
import ChatsView from "./pages/app/Chats";
import ProfileView from "./pages/app/Profile";
import SettingsView from "./pages/app/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/app" replace />} />
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<SwipeView />} />
            <Route path="matches" element={<MatchesView />} />
            <Route path="chats" element={<ChatsView />} />
            <Route path="profile" element={<ProfileView />} />
            <Route path="settings" element={<SettingsView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;