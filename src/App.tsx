import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import MissionPage from "./pages/MissionPage";
import SectorsPage from "./pages/SectorsPage";
import GlobalStagePage from "./pages/GlobalStagePage";
import JoinUsPage from "./pages/JoinUsPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

/** 🔧 TOGGLE MAINTENANCE MODE HERE */
const MAINTENANCE_MODE = false;

const MaintenancePage = () => (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#020617",
      color: "white",
      textAlign: "center",
      padding: "1rem",
    }}
  >
    <div>
      <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
         Website Under Maintenance
      </h1>
      <p style={{ fontWeight: "bold" }}>
        Uganda Martyrs SS Namugongo STEM Club
      </p>
      <p style={{ marginTop: "0.5rem", opacity: 0.8 }}>
        We’re adding new features. Please check back soon 
      </p>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      {MAINTENANCE_MODE ? (
        <MaintenancePage />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/mission" element={<MissionPage />} />
            <Route path="/sectors" element={<SectorsPage />} />
            <Route path="/global" element={<GlobalStagePage />} />
            <Route path="/join" element={<JoinUsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      )}
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
