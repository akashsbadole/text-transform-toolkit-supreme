import { adjectives, nouns } from '../scripts/gradientNames';
import { ColorGradient } from '../types/ColorGradient';

function generateRandomColor(): string {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function generateRandomName(): string {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adjective} ${noun}`;
}

export const generateRandomGradient = (id: number): ColorGradient => {
  const colors = [
    `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`,
    `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`
  ];

  return {
    id: id.toString(),
    name: `Random Gradient ${id}`,
    colors,
    css: `linear-gradient(to right, ${colors.join(', ')})`
  };
};

export const generateMultipleGradients = (count: number): ColorGradient[] => {
  return Array.from({ length: count }, (_, i) => generateRandomGradient(i + 1));
};

export const isValidHexColor = (color: string): boolean => {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
};

export const createGradientFromColors = (colors: string[], name: string): ColorGradient => {
  return {
    id: Date.now().toString(),
    name,
    colors,
    css: `linear-gradient(to right, ${colors.join(', ')})`
  };
}; 