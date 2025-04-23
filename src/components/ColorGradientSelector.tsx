import React, { useState, useEffect } from 'react';
import { ColorGradient } from '../types/ColorGradient';
import { generateRandomGradient } from '../utils/gradientUtils';

interface ColorGradientSelectorProps {
  onSelect: (gradient: ColorGradient) => void;
  selectedGradient?: ColorGradient;
}

const ColorGradientSelector: React.FC<ColorGradientSelectorProps> = ({ onSelect, selectedGradient }) => {
  const [gradients, setGradients] = useState<ColorGradient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGradients = async () => {
      try {
        const response = await fetch('/data/colorGradients.json');
        const data = await response.json();
        setGradients(data.gradients);
      } catch (error) {
        console.error('Error loading gradients:', error);
        // If loading fails, generate some random gradients
        const randomGradients = Array.from({ length: 10 }, (_, i) => generateRandomGradient(i + 1));
        setGradients(randomGradients);
      } finally {
        setLoading(false);
      }
    };

    loadGradients();
  }, []);

  const handleGradientClick = (gradient: ColorGradient) => {
    onSelect(gradient);
  };

  if (loading) {
    return <div>Loading gradients...</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {gradients.map((gradient) => (
        <div
          key={gradient.id}
          className={`relative aspect-square rounded-lg cursor-pointer transition-transform hover:scale-105 ${
            selectedGradient?.id === gradient.id ? 'ring-2 ring-primary ring-offset-2' : ''
          }`}
          onClick={() => handleGradientClick(gradient)}
          style={{ background: gradient.css }}
          title={gradient.name}
        >
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-lg">
            {gradient.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ColorGradientSelector; 