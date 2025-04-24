import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DummyTextGeneratorPage from "./pages/DummyTextGeneratorPage";
import ColorGeneratorPage from "./pages/ColorGeneratorPage";
import TextTransform from "./pages/TextTransform";
import TextTransformTools from "./pages/TextTransformTools";
import { useState } from "react";
import ColorAnalyzer from "./components/ColorAnalyzer";
import GradientGenerator from "./components/GradientGenerator";

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<string>('#000000');
  const [currentGradient, setCurrentGradient] = useState<string>('linear-gradient(90deg, #000000 0%, #ffffff 100%)');

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dummy-text-generator" element={<DummyTextGeneratorPage />} />
            <Route path="/color-generator" element={<ColorGeneratorPage />} />
            <Route path="/transform" element={<TextTransform />} />
            <Route path="/text-tools" element={<TextTransformTools />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
