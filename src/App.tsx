
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "@/hooks/use-theme";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Attestations from "./pages/Attestations";
import Resources from "./pages/Resources";
import Forum from "./pages/Forum";
import Directory from "./pages/Directory";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./components/layout/DashboardLayout";

// Dashboard pages
import DashboardStudents from "./pages/dashboard/Students";
import DashboardAttestations from "./pages/dashboard/Attestations";
import DashboardStatistics from "./pages/dashboard/Statistics";
import DashboardResources from "./pages/dashboard/Resources";
import DashboardForum from "./pages/dashboard/Forum";
import DashboardSettings from "./pages/dashboard/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/students" element={<Students />} />
            <Route path="/attestations" element={<Attestations />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/directory" element={<Directory />} />
            
            {/* Dashboard/Admin routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="students" element={<DashboardStudents />} />
              <Route path="attestations" element={<DashboardAttestations />} />
              <Route path="statistics" element={<DashboardStatistics />} />
              <Route path="resources" element={<DashboardResources />} />
              <Route path="forum" element={<DashboardForum />} />
              <Route path="settings" element={<DashboardSettings />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
