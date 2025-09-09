import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import StudentLayout from "./components/layout/StudentLayout";
import CareerPathway from "./pages/CareerPathway";
import Colleges from "./pages/Colleges";
import Scholarships from "./pages/Scholarships";
import Notifications from "./pages/Notifications";
import Mentorship from "./pages/Mentorship";
import Parents from "./pages/Parents";
import Landing from "./pages/Landing";
import CareerQuiz from "./pages/CareerQuiz";
import Signup from "./pages/Signup";

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <StudentLayout>
          <Routes>
            <Route path="/dashboard" element={<Index />} />
            <Route path="/career-pathway" element={<CareerPathway />} />
            <Route path="/colleges" element={<Colleges />} />
            <Route path="/scholarships" element={<Scholarships />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/mentorship" element={<Mentorship />} />
            <Route path="/parents" element={<Parents />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/career-quiz" element={<CareerQuiz />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Landing/>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </StudentLayout>
      </TooltipProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

createRoot(document.getElementById("root")!).render(<App />);
