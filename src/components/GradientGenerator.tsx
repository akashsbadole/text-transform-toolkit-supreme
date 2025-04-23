import React, { useState, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ColorStop {
  color: string;
  position: number;
}

interface GradientGeneratorProps {
  onGradientChange: (gradient: string) => void;
}

const presetGradients = [
  ['#2A7B9B', '#57C785', '#EDDD53'], // Teal to Yellow
  ['#000428', '#004e92'], // Deep Blue
  ['#43cea2', '#185a9d'], // Turquoise to Blue
  ['#ff6e7f', '#bfe9ff'], // Pink to Light Blue
  ['#ff0000', '#ff8000'], // Red to Orange
  ['#8e2de2', '#4a00e0'], // Purple
];

const GradientGenerator: React.FC<GradientGeneratorProps> = ({ onGradientChange }) => {
  const [gradientType, setGradientType] = useState<'linear' | 'radial'>('linear');
  const [angle, setAngle] = useState(90);
  const [colorStops, setColorStops] = useState<ColorStop[]>([
    { color: '#2A7B9B', position: 0 },
    { color: '#57C785', position: 50 },
    { color: '#EDDD53', position: 100 },
  ]);
  const [selectedStopIndex, setSelectedStopIndex] = useState(0);

  const updateColorStop = (index: number, updates: Partial<ColorStop>) => {
    const newStops = [...colorStops];
    newStops[index] = { ...newStops[index], ...updates };
    setColorStops(newStops);
  };

  const removeColorStop = (index: number) => {
    if (colorStops.length > 2) {
      const newStops = colorStops.filter((_, i) => i !== index);
      setColorStops(newStops);
      if (selectedStopIndex >= index) {
        setSelectedStopIndex(Math.max(0, selectedStopIndex - 1));
      }
    }
  };

  const addColorStop = () => {
    const lastStop = colorStops[colorStops.length - 1];
    const secondLastStop = colorStops[colorStops.length - 2];
    const newPosition = Math.min(100, lastStop.position + (lastStop.position - secondLastStop.position));
    setColorStops([...colorStops, { color: lastStop.color, position: newPosition }]);
  };

  const getGradientCSS = () => {
    const stops = colorStops
      .map(stop => `${stop.color} ${stop.position}%`)
      .join(', ');
    
    return gradientType === 'linear'
      ? `linear-gradient(${angle}deg, ${stops})`
      : `radial-gradient(circle at center, ${stops})`;
  };

  const applyPreset = (colors: string[]) => {
    const newStops = colors.map((color, index) => ({
      color,
      position: (index * 100) / (colors.length - 1),
    }));
    setColorStops(newStops);
    setSelectedStopIndex(0);
  };

  // Generate CSS gradient string and call onGradientChange
  useEffect(() => {
    const gradientCSS = getGradientCSS();
    onGradientChange(gradientCSS);
  }, [colorStops, gradientType, angle, onGradientChange]);

  return (
    <div className="p-6 bg-white/5 rounded-lg shadow-lg">
      <div className="space-y-6">
        {/* Gradient Preview */}
        <div 
          className="h-24 rounded-lg w-full cursor-pointer relative"
          style={{ background: getGradientCSS() }}
        >
          {/* Color Stop Markers */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-white/10">
            {colorStops.map((stop, index) => (
              <div
                key={index}
                className={`absolute w-4 h-4 -mt-2 -ml-2 rounded-full cursor-pointer border-2 
                  ${index === selectedStopIndex ? 'border-white scale-125' : 'border-gray-400'}`}
                style={{
                  left: `${stop.position}%`,
                  backgroundColor: stop.color,
                }}
                onClick={() => setSelectedStopIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Color Picker */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">Color</label>
              <HexColorPicker
                color={colorStops[selectedStopIndex].color}
                onChange={(color) => updateColorStop(selectedStopIndex, { color })}
              />
            </div>

            {/* Color Stop Controls */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">Color Stops</label>
              <div className="space-y-2">
                {colorStops.map((stop, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-10 h-10 p-0 rounded-md"
                          style={{ 
                            backgroundColor: stop.color,
                            border: index === selectedStopIndex ? '2px solid white' : '1px solid rgba(255,255,255,0.2)'
                          }}
                          onClick={() => setSelectedStopIndex(index)}
                        />
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-3" side="right">
                        <HexColorPicker
                          color={stop.color}
                          onChange={(color) => updateColorStop(index, { color })}
                        />
                      </PopoverContent>
                    </Popover>
                    <Input
                      value={stop.color}
                      onChange={(e) => updateColorStop(index, { color: e.target.value })}
                      className="w-28 bg-white/5 text-white"
                    />
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={stop.position}
                      onChange={(e) => updateColorStop(index, { position: Number(e.target.value) })}
                      className="w-20 bg-white/5 text-white"
                    />
                    {colorStops.length > 2 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeColorStop(index)}
                        className="text-white hover:bg-white/20"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addColorStop}
                  className="text-white"
                >
                  Add Color Stop
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Gradient Type */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">Gradient Type</label>
              <div className="flex gap-2">
                <Button
                  variant={gradientType === 'linear' ? 'default' : 'outline'}
                  onClick={() => setGradientType('linear')}
                >
                  Linear
                </Button>
                <Button
                  variant={gradientType === 'radial' ? 'default' : 'outline'}
                  onClick={() => setGradientType('radial')}
                >
                  Radial
                </Button>
              </div>
            </div>

            {/* Angle Control (for linear gradients) */}
            {gradientType === 'linear' && (
              <div>
                <label className="block text-sm font-medium text-white mb-2">Angle: {angle}°</label>
                <Input
                  type="range"
                  min={0}
                  max={360}
                  value={angle}
                  onChange={(e) => setAngle(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            )}

            {/* Preset Gradients */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">Presets</label>
              <div className="grid grid-cols-3 gap-2">
                {presetGradients.map((colors, index) => (
                  <div
                    key={index}
                    className="h-12 rounded-lg cursor-pointer hover:scale-105 transition-transform"
                    style={{
                      background: `linear-gradient(to right, ${colors.join(', ')})`,
                    }}
                    onClick={() => applyPreset(colors)}
                  />
                ))}
              </div>
            </div>

            {/* CSS Output */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">CSS</label>
              <div className="bg-white/5 p-2 rounded">
                <code className="text-sm text-white/80 break-all">
                  background: {getGradientCSS()};
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradientGenerator; 