
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme/theme-provider";
import Index from "./pages/Index";
import Meals from "./pages/Meals";
import Names from "./pages/Names";
import Registry from "./pages/Registry";
import DadJokes from "./pages/DadJokes";
import Auth from "./pages/Auth";
import FrameApi from "./pages/FrameApi";
import NotFound from "./pages/NotFound";
import { UserProvider } from "./contexts/UserContext";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="system" storageKey="dadprep-theme">
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/meals" element={<Meals />} />
              <Route path="/names" element={<Names />} />
              <Route path="/registry" element={<Registry />} />
              <Route path="/dad-jokes" element={<DadJokes />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/api/frame" element={<FrameApi />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </UserProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
