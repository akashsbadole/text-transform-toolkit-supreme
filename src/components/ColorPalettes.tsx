import React, { useState, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ColorPalette {
  name: string;
  colors: string[];
}

interface ColorPaletteCategory {
  name: string;
  palettes: ColorPalette[];
}

const colorPaletteCategories: ColorPaletteCategory[] = [
  {
    name: "Generated Palettes",
    palettes: [
      { name: "Monochromatic", colors: ["#2A7B9B", "#3A8BAB", "#4A9BBB", "#5AABCB", "#6ABBDB"] },
      { name: "Complementary", colors: ["#2A7B9B", "#9B2A2A"] },
      { name: "Analogous", colors: ["#2A7B9B", "#2A9B7B", "#2A7B9B", "#2A5B9B"] },
      { name: "Triadic", colors: ["#2A7B9B", "#9B2A7B", "#7B9B2A"] },
      { name: "Split-Complementary", colors: ["#2A7B9B", "#9B2A5B", "#9B5B2A"] },
      { name: "Rectangular", colors: ["#2A7B9B", "#9B2A2A", "#9B9B2A", "#2A9B2A"] },
      { name: "Square", colors: ["#2A7B9B", "#9B2A7B", "#9B9B2A", "#2A9B2A"] },
    ]
  },
  {
    name: "Color Scheme Palettes",
    palettes: [
      { name: "Pastel", colors: ["#FFB3BA", "#BAFFC9", "#BAE1FF", "#FFFFBA", "#FFE4BA"] },
      { name: "Neon", colors: ["#FF00FF", "#00FFFF", "#FFFF00", "#00FF00", "#FF0000"] },
      { name: "Bright", colors: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEEAD"] },
      { name: "Muted", colors: ["#A8A8A8", "#B8B8B8", "#C8C8C8", "#D8D8D8", "#E8E8E8"] },
      { name: "Earthy", colors: ["#8B4513", "#A0522D", "#CD853F", "#DEB887", "#F5DEB3"] },
      { name: "Nature-inspired", colors: ["#2E8B57", "#3CB371", "#20B2AA", "#48D1CC", "#40E0D0"] },
      { name: "Vintage", colors: ["#D2B48C", "#DEB887", "#F5DEB3", "#FAEBD7", "#FFEFD5"] },
      { name: "Retro", colors: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEEAD"] },
      { name: "Minimalist", colors: ["#FFFFFF", "#F5F5F5", "#E0E0E0", "#CCCCCC", "#BDBDBD"] },
      { name: "Bold", colors: ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF"] },
    ]
  },
  {
    name: "Specific Color Palettes",
    palettes: [
      { name: "Rainbow", colors: ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#9400D3"] },
      { name: "Ombre", colors: ["#FF69B4", "#FF1493", "#C71585", "#8B008B", "#4B0082"] },
      { name: "Gradient", colors: ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF"] },
      { name: "Duotone", colors: ["#2A7B9B", "#57C785"] },
      { name: "Sepia", colors: ["#704214", "#8B4513", "#A0522D", "#CD853F", "#DEB887"] },
      { name: "Grayscale", colors: ["#000000", "#333333", "#666666", "#999999", "#CCCCCC", "#FFFFFF"] },
      { name: "Warm neutrals", colors: ["#F5F5DC", "#DEB887", "#D2B48C", "#BC8F8F", "#A0522D"] },
      { name: "Cool neutrals", colors: ["#F0F8FF", "#E6E6FA", "#D8BFD8", "#B0C4DE", "#A9A9A9"] },
    ]
  },
  {
    name: "Mood-based Color Palettes",
    palettes: [
      { name: "Calming", colors: ["#E0F7FA", "#B2EBF2", "#80DEEA", "#4DD0E1", "#26C6DA"] },
      { name: "Energizing", colors: ["#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#F44336"] },
      { name: "Moody", colors: ["#2C3E50", "#34495E", "#7F8C8D", "#95A5A6", "#BDC3C7"] },
      { name: "Playful", colors: ["#FF9AA2", "#FFB7B2", "#FFDAC1", "#E2F0CB", "#B5EAD7"] },
      { name: "Sophisticated", colors: ["#2C3E50", "#34495E", "#7F8C8D", "#95A5A6", "#BDC3C7"] },
      { name: "Whimsical", colors: ["#FF9AA2", "#FFB7B2", "#FFDAC1", "#E2F0CB", "#B5EAD7"] },
      { name: "Dark and mysterious", colors: ["#1A1A1A", "#2C2C2C", "#3D3D3D", "#4F4F4F", "#616161"] },
      { name: "Light and airy", colors: ["#FFFFFF", "#F5F5F5", "#E0E0E0", "#CCCCCC", "#BDBDBD"] },
    ]
  },
  {
    name: "Seasonal Color Palettes",
    palettes: [
      { name: "Winter wonderland", colors: ["#FFFFFF", "#F0F8FF", "#E0F7FA", "#B2EBF2", "#80DEEA"] },
      { name: "Spring florals", colors: ["#FFB6C1", "#FFC0CB", "#FFE4E1", "#FFF0F5", "#FF69B4"] },
      { name: "Summer vibes", colors: ["#FFD700", "#FFA500", "#FF8C00", "#FF7F50", "#FF6347"] },
      { name: "Autumn leaves", colors: ["#8B4513", "#A0522D", "#CD853F", "#DEB887", "#F5DEB3"] },
    ]
  },
  {
    name: "Industry-specific Color Palettes",
    palettes: [
      { name: "Corporate", colors: ["#2C3E50", "#34495E", "#7F8C8D", "#95A5A6", "#BDC3C7"] },
      { name: "Creative", colors: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEEAD"] },
      { name: "Tech", colors: ["#2A7B9B", "#57C785", "#EDDD53", "#FF6B6B", "#4ECDC4"] },
      { name: "Fashion", colors: ["#FF69B4", "#FF1493", "#C71585", "#8B008B", "#4B0082"] },
      { name: "Food and beverage", colors: ["#FF6B6B", "#FFA07A", "#FFD700", "#98FB98", "#87CEEB"] },
      { name: "Travel and hospitality", colors: ["#2A7B9B", "#57C785", "#EDDD53", "#FF6B6B", "#4ECDC4"] },
    ]
  },
  {
    name: "Other Color Palettes",
    palettes: [
      { name: "Boho chic", colors: ["#FF9AA2", "#FFB7B2", "#FFDAC1", "#E2F0CB", "#B5EAD7"] },
      { name: "Industrial", colors: ["#2C3E50", "#34495E", "#7F8C8D", "#95A5A6", "#BDC3C7"] },
      { name: "Luxe", colors: ["#2C3E50", "#34495E", "#7F8C8D", "#95A5A6", "#BDC3C7"] },
      { name: "Retro futurism", colors: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEEAD"] },
      { name: "Grunge", colors: ["#2C3E50", "#34495E", "#7F8C8D", "#95A5A6", "#BDC3C7"] },
      { name: "Cyberpunk", colors: ["#FF00FF", "#00FFFF", "#FFFF00", "#00FF00", "#FF0000"] },
    ]
  }
];

interface ColorPalettesProps {
  onPaletteSelect: (colors: string[]) => void;
}

const ColorPalettes: React.FC<ColorPalettesProps> = ({ onPaletteSelect }) => {
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

        {/* Color Palettes Categories */}
        <div className="space-y-8">
          {colorPaletteCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-4">
              <h3 className="text-lg font-semibold text-white">{category.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.palettes.map((palette, paletteIndex) => (
                  <div
                    key={paletteIndex}
                    className="bg-white/10 rounded-lg p-4 space-y-2 hover:bg-white/20 transition-colors"
                    onClick={() => onPaletteSelect(palette.colors)}
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorPalettes; 