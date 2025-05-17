
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import GuestDatabase from "./pages/GuestDatabase";
import LostFoundPage from "./pages/LostFound";
import RatesManagement from "./pages/RatesManagement";
import StayView from "./pages/StayView";
import Reports from "./pages/Reports";
import ActivityLogs from "./pages/ActivityLogs";
import WebsiteBuilder from "./pages/WebsiteBuilder";
import MessagingInbox from "./pages/MessagingInbox";
import ReservationsPage from "./pages/ReservationsPage";

// Create a new client
const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/guests" element={<GuestDatabase />} />
              <Route path="/lost-found" element={<LostFoundPage />} />
              <Route path="/rates" element={<RatesManagement />} />
              <Route path="/stays" element={<StayView />} />
              <Route path="/reservations" element={<ReservationsPage />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/activity-logs" element={<ActivityLogs />} />
              <Route path="/website-builder" element={<WebsiteBuilder />} />
              <Route path="/messages" element={<MessagingInbox />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
