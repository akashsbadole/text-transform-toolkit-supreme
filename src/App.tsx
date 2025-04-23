import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DummyTextGeneratorPage from "./pages/DummyTextGeneratorPage";
import ColorGeneratorPage from "./pages/ColorGeneratorPage";
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
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Text Transform Toolkit Supreme</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Color Analysis</h2>
            <ColorAnalyzer onColorChange={setSelectedColor} />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Gradient Generator</h2>
            <GradientGenerator onGradientChange={setCurrentGradient} />
          </div>
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Preview</h2>
            <div 
              className="p-8 rounded-lg text-center text-white text-2xl font-bold"
              style={{ background: currentGradient }}
            >
              Sample Text
            </div>
            <div className="mt-4">
              <p>Selected Color: {selectedColor}</p>
              <p>Current Gradient: {currentGradient}</p>
            </div>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default App;
