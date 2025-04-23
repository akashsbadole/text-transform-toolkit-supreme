import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';
import { GradientType } from '@/utils/colorUtils';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { gradients } = req.body;
    const filePath = join(process.cwd(), 'src/data/colorGradients.json');
    
    // Read existing data
    const fileContent = readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    
    // Update user gradients
    data.userGradients = gradients;
    
    // Write back to file
    writeFileSync(filePath, JSON.stringify(data, null, 2));
    
    res.status(200).json({ message: 'Gradients saved successfully' });
  } catch (error) {
    console.error('Error saving gradients:', error);
    res.status(500).json({ message: 'Failed to save gradients' });
  }
} 