import { v4 as uuidv4 } from 'uuid';

export interface GradientType {
  id: string;
  name: string;
  colors: string[];
  css: string;
}

export interface ColorGradientsData {
  gradients: GradientType[];
  userGradients: GradientType[];
}

export const generateRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const generateRandomGradient = (numColors: number = 2): GradientType => {
  const colors = Array(numColors).fill(null).map(() => generateRandomColor());
  return {
    id: uuidv4(),
    name: `Custom Gradient ${new Date().toISOString()}`,
    colors,
    css: `linear-gradient(to right, ${colors.join(', ')})`
  };
};

export const generateMultipleGradients = (count: number): GradientType[] => {
  return Array(count).fill(null).map(() => generateRandomGradient());
};

export const isValidHexColor = (color: string): boolean => {
  return /^#[0-9A-F]{6}$/i.test(color);
};

export const createGradientFromColors = (colors: string[], name: string = ''): GradientType => {
  return {
    id: uuidv4(),
    name: name || `Custom Gradient ${new Date().toISOString()}`,
    colors,
    css: `linear-gradient(to right, ${colors.join(', ')})`
  };
}; 