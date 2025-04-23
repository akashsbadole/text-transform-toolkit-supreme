import React, { useState } from 'react';
import ColorAnalyzer from '../components/ColorAnalyzer';
import GradientGenerator from '../components/GradientGenerator';
import ColorPalettes from '../components/ColorPalettes';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ColorGeneratorPage: React.FC = () => {
  const [analyzerBackground, setAnalyzerBackground] = useState('');
  const [gradientBackground, setGradientBackground] = useState('');
  const [paletteBackground, setPaletteBackground] = useState('');

  const handleAnalyzerColorChange = (color: string) => {
    setAnalyzerBackground(color);
  };

  const handleGradientChange = (gradient: string) => {
    setGradientBackground(gradient);
  };

  const handlePaletteChange = (colors: string[]) => {
    // Create a gradient from the selected colors
    const gradient = `linear-gradient(to right, ${colors.join(', ')})`;
    setPaletteBackground(gradient);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-white">Color Generator</h1>
          
          <div className="space-y-8">
            <section 
              className="transition-all duration-500 rounded-xl p-8"
              style={{ 
                background: analyzerBackground ? `linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), ${analyzerBackground}` : 'transparent'
              }}
            >
              <h2 className="text-2xl font-semibold mb-4 text-white">Color Analysis</h2>
              <ColorAnalyzer onColorChange={handleAnalyzerColorChange} />
            </section>

            <section 
              className="transition-all duration-500 rounded-xl p-8"
              style={{ 
                background: gradientBackground ? `linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), ${gradientBackground}` : 'transparent'
              }}
            >
              <h2 className="text-2xl font-semibold mb-4 text-white">Gradient Generator</h2>
              <GradientGenerator onGradientChange={handleGradientChange} />
            </section>

            <section 
              className="transition-all duration-500 rounded-xl p-8"
              style={{ 
                background: paletteBackground ? `linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), ${paletteBackground}` : 'transparent'
              }}
            >
              <h2 className="text-2xl font-semibold mb-4 text-white">Color Palettes</h2>
              <ColorPalettes 
                // @ts-ignore
                onPaletteChange={handlePaletteChange} 
              />
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ColorGeneratorPage; 