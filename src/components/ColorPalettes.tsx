import React, { useState, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ColorPalette {
  name: string;
  colors: string[];
}

const ColorPalettes: React.FC = () => {
  const [primaryColor, setPrimaryColor] = useState('#2A7B9B');
  const [secondaryColor, setSecondaryColor] = useState('#EDDD53');
  const [showPrimaryPicker, setShowPrimaryPicker] = useState(false);
  const [showSecondaryPicker, setShowSecondaryPicker] = useState(false);
  const [palettes, setPalettes] = useState<ColorPalette[]>([]);
  const { toast } = useToast();

  const hexToHsl = (hex: string): [number, number, number] => {
    // Convert hex to RGB
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return [h * 360, s * 100, l * 100];
  };

  const hslToHex = (h: number, s: number, l: number): string => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const generatePalettes = () => {
    const [h1, s1, l1] = hexToHsl(primaryColor);
    const [h2, s2, l2] = hexToHsl(secondaryColor);

    // Generate different types of palettes
    const palettes: ColorPalette[] = [
      {
        name: 'Complementary',
        colors: [
          primaryColor,
          hslToHex((h1 + 180) % 360, s1, l1),
          secondaryColor,
          hslToHex((h2 + 180) % 360, s2, l2),
        ]
      },
      {
        name: 'Analogous',
        colors: [
          hslToHex((h1 - 30 + 360) % 360, s1, l1),
          primaryColor,
          hslToHex((h1 + 30) % 360, s1, l1),
          secondaryColor,
        ]
      },
      {
        name: 'Triadic',
        colors: [
          primaryColor,
          hslToHex((h1 + 120) % 360, s1, l1),
          secondaryColor,
          hslToHex((h2 + 120) % 360, s2, l2),
        ]
      },
      {
        name: 'Split Complementary',
        colors: [
          primaryColor,
          hslToHex((h1 + 150) % 360, s1, l1),
          hslToHex((h1 + 210) % 360, s1, l1),
          secondaryColor,
        ]
      },
      {
        name: 'Monochromatic',
        colors: [
          hslToHex(h1, s1, Math.max(0, l1 - 30)),
          primaryColor,
          hslToHex(h1, s1, Math.min(100, l1 + 30)),
          secondaryColor,
        ]
      },
      {
        name: 'Gradient',
        colors: [
          primaryColor,
          hslToHex(h1, s1, l1 * 0.8),
          hslToHex(h2, s2, l2 * 1.2),
          secondaryColor,
        ]
      },
    ];

    setPalettes(palettes);
  };

  useEffect(() => {
    generatePalettes();
  }, [primaryColor, secondaryColor]);

  const copyToClipboard = (colors: string[]) => {
    const text = colors.join(', ');
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Color palette copied to clipboard",
      duration: 2000,
    });
  };

  return (
    <div className="p-6 bg-white/5 rounded-lg shadow-lg">
      <div className="space-y-6">
        {/* Color Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Primary Color */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-white">Primary Color</label>
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-lg cursor-pointer border-2 border-white/20"
                style={{ backgroundColor: primaryColor }}
                onClick={() => setShowPrimaryPicker(!showPrimaryPicker)}
              />
              <div className="flex-grow">
                <input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-full bg-white/5 text-white rounded px-3 py-2"
                />
              </div>
            </div>
            {showPrimaryPicker && (
              <div className="absolute z-10">
                <div className="fixed inset-0" onClick={() => setShowPrimaryPicker(false)} />
                <HexColorPicker color={primaryColor} onChange={setPrimaryColor} />
              </div>
            )}
          </div>

          {/* Secondary Color */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-white">Secondary Color</label>
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-lg cursor-pointer border-2 border-white/20"
                style={{ backgroundColor: secondaryColor }}
                onClick={() => setShowSecondaryPicker(!showSecondaryPicker)}
              />
              <div className="flex-grow">
                <input
                  type="text"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="w-full bg-white/5 text-white rounded px-3 py-2"
                />
              </div>
            </div>
            {showSecondaryPicker && (
              <div className="absolute z-10">
                <div className="fixed inset-0" onClick={() => setShowSecondaryPicker(false)} />
                <HexColorPicker color={secondaryColor} onChange={setSecondaryColor} />
              </div>
            )}
          </div>
        </div>

        {/* Generated Palettes */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Generated Palettes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {palettes.map((palette, index) => (
              <div
                key={index}
                className="bg-white/10 rounded-lg p-4 space-y-2 hover:bg-white/20 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-white font-medium">{palette.name}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(palette.colors)}
                    className="text-white hover:bg-white/20"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  {palette.colors.map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      className="flex-1 h-16 rounded-lg"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
                <div className="flex gap-2 text-xs text-white/60">
                  {palette.colors.map((color, colorIndex) => (
                    <div key={colorIndex} className="flex-1 text-center">
                      {color}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPalettes; 