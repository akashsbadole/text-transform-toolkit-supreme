import { writeFileSync } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

interface GradientType {
  id: string;
  name: string;
  colors: string[];
  css: string;
}

const generateRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const generateGradient = (index: number): GradientType => {
  // Randomly decide if gradient will have 2, 3, or 4 colors
  const numColors = Math.floor(Math.random() * 3) + 2;
  const colors = Array(numColors).fill(null).map(() => generateRandomColor());
  
  return {
    id: uuidv4(),
    name: `Gradient ${index + 1}`,
    colors,
    css: `linear-gradient(to right, ${colors.join(', ')})`
  };
};

const gradientCategories = [
  'Sunset',
  'Ocean',
  'Forest',
  'Desert',
  'Mountain',
  'Space',
  'Neon',
  'Pastel',
  'Fire',
  'Earth'
];

const generateGradients = () => {
  const gradients: GradientType[] = [];
  
  // Generate 1000 gradients
  for (let i = 0; i < 1000; i++) {
    const category = gradientCategories[Math.floor(Math.random() * gradientCategories.length)];
    const gradient = generateGradient(i);
    gradient.name = `${category} ${Math.floor(i / 100) + 1}.${i % 100 + 1}`;
    gradients.push(gradient);
  }

  // Prepare the data structure
  const data = {
    gradients,
    userGradients: []
  };

  // Save to file
  const filePath = join(process.cwd(), 'src/data/colorGradients.json');
  writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log('Generated 1000 gradients and saved to colorGradients.json');
};

// Run the generator
generateGradients(); 