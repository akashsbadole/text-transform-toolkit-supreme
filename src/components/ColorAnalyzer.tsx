import React, { useState, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ColorInfo {
  hex: string;
  rgb: string;
  hsl: string;
  hsv: string;
  cmyk: string;
  triadic: string[];
  monochromatic: string[];
  analogous: string[];
  complementary: string;
  shades: string[];
  tints: string[];
  tones: string[];
  rgbValues: [number, number, number];
  cmykValues: [number, number, number, number];
  baseNumbers: {
    binary: string[];
    octal: string[];
    decimal: number[];
    hex: string[];
  };
}

interface ColorAnalyzerProps {
  onColorChange: (color: string) => void;
}

const ColorAnalyzer: React.FC<ColorAnalyzerProps> = ({ onColorChange }) => {
  const [selectedColor, setSelectedColor] = useState('#ff0000');
  const [colorInfo, setColorInfo] = useState<ColorInfo | null>(null);
  const { toast } = useToast();

  const hexToRgb = (hex: string): [number, number, number] => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
  };

  const rgbToHsl = (r: number, g: number, b: number): [number, number, number] => {
    r /= 255;
    g /= 255;
    b /= 255;
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

  const rgbToHsv = (r: number, g: number, b: number): [number, number, number] => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const d = max - min;
    let h = 0;
    const s = max === 0 ? 0 : d / max;
    const v = max;

    if (max !== min) {
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

    return [h * 360, s * 100, v * 100];
  };

  const rgbToCmyk = (r: number, g: number, b: number): [number, number, number, number] => {
    r /= 255;
    g /= 255;
    b /= 255;
    const k = 1 - Math.max(r, g, b);
    const c = (1 - r - k) / (1 - k) || 0;
    const m = (1 - g - k) / (1 - k) || 0;
    const y = (1 - b - k) / (1 - k) || 0;
    return [c * 100, m * 100, y * 100, k * 100];
  };

  const generateColorVariations = (hex: string) => {
    const [r, g, b] = hexToRgb(hex);
    const [h, s, l] = rgbToHsl(r, g, b);

    // Generate triadic colors
    const triadic = [
      `hsl(${(h + 120) % 360}, ${s}%, ${l}%)`,
      `hsl(${(h + 240) % 360}, ${s}%, ${l}%)`,
    ];

    // Generate monochromatic colors
    const monochromatic = [
      `hsl(${h}, ${s}%, ${Math.max(0, l - 20)}%)`,
      `hsl(${h}, ${s}%, ${Math.min(100, l + 20)}%)`,
    ];

    // Generate analogous colors
    const analogous = [
      `hsl(${(h + 30) % 360}, ${s}%, ${l}%)`,
      `hsl(${(h - 30 + 360) % 360}, ${s}%, ${l}%)`,
    ];

    // Generate complementary color
    const complementary = `hsl(${(h + 180) % 360}, ${s}%, ${l}%)`;

    // Generate shades
    const shades = [
      `hsl(${h}, ${s}%, ${Math.max(0, l - 40)}%)`,
      `hsl(${h}, ${s}%, ${Math.max(0, l - 20)}%)`,
    ];

    // Generate tints
    const tints = [
      `hsl(${h}, ${s}%, ${Math.min(100, l + 20)}%)`,
      `hsl(${h}, ${s}%, ${Math.min(100, l + 40)}%)`,
    ];

    // Generate tones
    const tones = [
      `hsl(${h}, ${Math.max(0, s - 20)}%, ${l}%)`,
      `hsl(${h}, ${Math.max(0, s - 40)}%, ${l}%)`,
    ];

    return {
      triadic,
      monochromatic,
      analogous,
      complementary,
      shades,
      tints,
      tones,
    };
  };

  const copyToClipboard = (text: string, type: string = 'color') => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${type} copied to clipboard`,
      duration: 2000,
    });
  };

  const getBaseNumbers = (r: number, g: number, b: number) => {
    return {
      binary: [
        r.toString(2).padStart(8, '0'),
        g.toString(2).padStart(8, '0'),
        b.toString(2).padStart(8, '0')
      ],
      octal: [
        r.toString(8),
        g.toString(8),
        b.toString(8)
      ],
      decimal: [r, g, b],
      hex: [
        r.toString(16).padStart(2, '0').toUpperCase(),
        g.toString(16).padStart(2, '0').toUpperCase(),
        b.toString(16).padStart(2, '0').toUpperCase()
      ]
    };
  };

  const generateCssExamples = (hex: string, rgb: string) => {
    return {
      textColor: [
        `color: ${rgb};`,
        `color: ${hex};`
      ],
      textShadow: [
        `text-shadow: 2px 2px 4px rgb(0, 0, 0);`,
        `text-shadow: 2px 2px 4px #000000;`
      ],
      backgroundColor: [
        `background-color: ${rgb};`,
        `background-color: ${hex};`
      ],
      boxShadow: [
        `box-shadow: 10px 10px 5px ${rgb};`,
        `box-shadow: 10px 10px 5px ${hex};`
      ],
      border: [
        `border: 1px solid ${rgb};`,
        `border: 1px solid ${hex};`
      ]
    };
  };

  useEffect(() => {
    const [r, g, b] = hexToRgb(selectedColor);
    const [h, s, l] = rgbToHsl(r, g, b);
    const [hsvH, hsvS, hsvV] = rgbToHsv(r, g, b);
    const [c, m, y, k] = rgbToCmyk(r, g, b);
    const variations = generateColorVariations(selectedColor);
    const baseNumbers = getBaseNumbers(r, g, b);
    const rgb = `rgb(${r}, ${g}, ${b})`;

    setColorInfo({
      hex: selectedColor,
      rgb,
      hsl: `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`,
      hsv: `hsv(${Math.round(hsvH)}, ${Math.round(hsvS)}%, ${Math.round(hsvV)}%)`,
      cmyk: `cmyk(${Math.round(c)}%, ${Math.round(m)}%, ${Math.round(y)}%, ${Math.round(k)}%)`,
      rgbValues: [r, g, b],
      cmykValues: [c, m, y, k],
      baseNumbers,
      ...variations,
    });
  }, [selectedColor]);

  // Call onColorChange whenever selectedColor changes
  useEffect(() => {
    onColorChange(selectedColor);
  }, [selectedColor, onColorChange]);

  return (
    <div className="p-6 bg-white/5 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white mb-2">Select Color</label>
            <HexColorPicker color={selectedColor} onChange={setSelectedColor} />
          </div>
          
          <div className="space-y-4">
            <div className="p-4 rounded-lg" style={{ backgroundColor: selectedColor }}>
              <p className="text-white text-center font-bold">Selected Color: {selectedColor}</p>
            </div>

            {colorInfo && (
              <>
                {/* Base Numbers */}
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2 text-white">Base Numbers</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium text-white">Binary</p>
                      <div className="grid grid-cols-3 gap-2">
                        {colorInfo.baseNumbers.binary.map((value, i) => (
                          <div key={i} className="bg-white/5 p-1 rounded">
                            <p className="text-xs text-white/80 font-mono">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Octal</p>
                      <div className="grid grid-cols-3 gap-2">
                        {colorInfo.baseNumbers.octal.map((value, i) => (
                          <div key={i} className="bg-white/5 p-1 rounded">
                            <p className="text-xs text-white/80 font-mono">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Decimal</p>
                      <div className="grid grid-cols-3 gap-2">
                        {colorInfo.baseNumbers.decimal.map((value, i) => (
                          <div key={i} className="bg-white/5 p-1 rounded">
                            <p className="text-xs text-white/80 font-mono">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Hex</p>
                      <div className="grid grid-cols-3 gap-2">
                        {colorInfo.baseNumbers.hex.map((value, i) => (
                          <div key={i} className="bg-white/5 p-1 rounded">
                            <p className="text-xs text-white/80 font-mono">#{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* RGB Percentages */}
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2 text-white">RGB Percentages</h3>
                  <div className="space-y-2">
                    {['Red', 'Green', 'Blue'].map((color, i) => (
                      <div key={color}>
                        <p className="text-sm font-medium text-white">{color}</p>
                        <div className="h-4 bg-white/5 rounded overflow-hidden">
                          <div
                            className="h-full"
                            style={{
                              width: `${(colorInfo.rgbValues[i] / 255) * 100}%`,
                              backgroundColor: i === 0 ? 'red' : i === 1 ? 'green' : 'blue'
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CMYK Percentages */}
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2 text-white">CMYK Percentages</h3>
                  <div className="space-y-2">
                    {['Cyan', 'Magenta', 'Yellow', 'Key'].map((color, i) => (
                      <div key={color}>
                        <p className="text-sm font-medium text-white">{color}</p>
                        <div className="h-4 bg-white/5 rounded overflow-hidden">
                          <div
                            className="h-full"
                            style={{
                              width: `${colorInfo.cmykValues[i]}%`,
                              backgroundColor: i === 0 ? 'cyan' : i === 1 ? 'magenta' : i === 2 ? 'yellow' : 'black'
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Color Preview */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black p-4 rounded-lg">
                    <div className="h-20 flex items-center justify-center" style={{ backgroundColor: selectedColor }}>
                      <p className="text-white text-sm">Preview on Black</p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="h-20 flex items-center justify-center" style={{ backgroundColor: selectedColor }}>
                      <p className="text-black text-sm">Preview on White</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {colorInfo && (
            <>
              {/* Color Models */}
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2 text-white">Color Models</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-white/5 rounded">
                    <p className="text-sm font-medium text-white">RGB</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-white/80">{colorInfo.rgb}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(colorInfo.rgb, 'RGB')}
                        className="text-white hover:bg-white/20"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-2 bg-white/5 rounded">
                    <p className="text-sm font-medium text-white">HSL</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-white/80">{colorInfo.hsl}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(colorInfo.hsl, 'HSL')}
                        className="text-white hover:bg-white/20"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-2 bg-white/5 rounded">
                    <p className="text-sm font-medium text-white">HSV</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-white/80">{colorInfo.hsv}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(colorInfo.hsv, 'HSV')}
                        className="text-white hover:bg-white/20"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-2 bg-white/5 rounded">
                    <p className="text-sm font-medium text-white">CMYK</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-white/80">{colorInfo.cmyk}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(colorInfo.cmyk, 'CMYK')}
                        className="text-white hover:bg-white/20"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* CSS Examples */}
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2 text-white">CSS Examples</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-white mb-2">Text Color</p>
                    <div className="bg-white/5 p-2 rounded">
                      <p className="text-sm font-mono text-white/80" style={{ color: selectedColor }}>
                        color: {selectedColor};
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-2">Background Color</p>
                    <div className="bg-white/5 p-2 rounded">
                      <div className="h-8 rounded" style={{ backgroundColor: selectedColor }}>
                        <p className="text-sm font-mono text-white/80 p-2">
                          background-color: {selectedColor};
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-2">Border Color</p>
                    <div className="bg-white/5 p-2 rounded">
                      <div className="h-8 rounded" style={{ border: `2px solid ${selectedColor}` }}>
                        <p className="text-sm font-mono text-white/80 p-2">
                          border: 2px solid {selectedColor};
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-2">Box Shadow</p>
                    <div className="bg-white/5 p-2 rounded">
                      <div 
                        className="h-8 rounded bg-white/20" 
                        style={{ boxShadow: `4px 4px 8px ${selectedColor}` }}
                      >
                        <p className="text-sm font-mono text-white/80 p-2">
                          box-shadow: 4px 4px 8px {selectedColor};
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Color Relationships */}
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2 text-white">Color Relationships</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium text-white">Triadic Colors</p>
                    <div className="flex gap-2">
                      {colorInfo.triadic.map((color, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 rounded cursor-pointer hover:scale-110 transition-transform"
                          style={{ backgroundColor: color }}
                          onClick={() => copyToClipboard(color, 'Triadic Color')}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Monochromatic Colors</p>
                    <div className="flex gap-2">
                      {colorInfo.monochromatic.map((color, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 rounded cursor-pointer hover:scale-110 transition-transform"
                          style={{ backgroundColor: color }}
                          onClick={() => copyToClipboard(color, 'Monochromatic Color')}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Analogous Colors</p>
                    <div className="flex gap-2">
                      {colorInfo.analogous.map((color, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 rounded cursor-pointer hover:scale-110 transition-transform"
                          style={{ backgroundColor: color }}
                          onClick={() => copyToClipboard(color, 'Analogous Color')}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Complementary Color</p>
                    <div className="flex gap-2">
                      <div
                        className="w-8 h-8 rounded cursor-pointer hover:scale-110 transition-transform"
                        style={{ backgroundColor: colorInfo.complementary }}
                        onClick={() => copyToClipboard(colorInfo.complementary, 'Complementary Color')}
                        title={colorInfo.complementary}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Color Variations */}
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2 text-white">Color Variations</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium text-white">Shades</p>
                    <div className="flex gap-2">
                      {colorInfo.shades.map((color, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 rounded cursor-pointer hover:scale-110 transition-transform"
                          style={{ backgroundColor: color }}
                          onClick={() => copyToClipboard(color, 'Shade')}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Tints</p>
                    <div className="flex gap-2">
                      {colorInfo.tints.map((color, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 rounded cursor-pointer hover:scale-110 transition-transform"
                          style={{ backgroundColor: color }}
                          onClick={() => copyToClipboard(color, 'Tint')}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Tones</p>
                    <div className="flex gap-2">
                      {colorInfo.tones.map((color, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 rounded cursor-pointer hover:scale-110 transition-transform"
                          style={{ backgroundColor: color }}
                          onClick={() => copyToClipboard(color, 'Tone')}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ColorAnalyzer; 