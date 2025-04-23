import { writeFileSync } from 'fs';
import { join } from 'path';
import { adjectives, nouns } from './gradientNames';

interface Gradient {
  id: string;
  name: string;
  colors: string[];
  css: string;
}

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

function generateRandomGradient(id: number): Gradient {
  const color1 = generateRandomColor();
  const color2 = generateRandomColor();
  const name = generateRandomName();
  
  return {
    id: id.toString(),
    name,
    colors: [color1, color2],
    css: `linear-gradient(to right, ${color1}, ${color2})`
  };
}

// Generate 1000 random gradients
const gradients: Gradient[] = [];
for (let i = 1; i <= 1000; i++) {
  gradients.push(generateRandomGradient(i));
}

const data = {
  gradients,
  userGradients: []
};

// Write to file
const outputPath = join(__dirname, '../data/colorGradients.json');
writeFileSync(outputPath, JSON.stringify(data, null, 2));

console.log('Generated 1000 random color gradients!'); 