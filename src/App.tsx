
import { Toaster as Sonner } from "./client/components/ui/sonner";
import { Toaster } from "./client/components/ui/toaster";
import { TooltipProvider } from "./client/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";

import Index from "./client/pages/Index";
import NotFound from "./client/pages/NotFound";
import StudentLayout from "./client/components/layout/StudentLayout";
import CareerPathway from "./client/pages/CareerPathway";
import Colleges from "./client/pages/Colleges";
import Scholarships from "./client/pages/Scholarships";
import Notifications from "./client/pages/Notifications";
import Mentorship from "./client/pages/Mentorship";
import Parents from "./client/pages/Parents";
import Landing from "./client/pages/Landing";
import CareerQuiz from "./client/pages/CareerQuiz";
import Signup from "./client/pages/Signup";
import Signin from "./client/pages/Signin";
import Timeline from "./client/pages/Timeline";
import Recommendations from "./client/pages/Recommendations";
import Outcomes from "./client/pages/Outcomes";
import Resources from "./client/pages/Resources";
import Admin from "./client/pages/admin/Admin";

import "./App.css";



const queryClient = new QueryClient();

export const App = () => (
  <BrowserRouter>
    {/* <QueryClientProvider client={queryClient}> */}
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
            <Route path="/career-quiz" element={<CareerQuiz />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/outcomes" element={<Outcomes />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/" element={<Landing />} />
            {/* <Route path="/" element={<Navigate to="/landing" replace />} /> */}
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </StudentLayout>
      </TooltipProvider>
    {/* </QueryClientProvider> */}
  </BrowserRouter>
);

