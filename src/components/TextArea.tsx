
import React from 'react';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';

interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const TextArea: React.FC<TextAreaProps> = ({ value, onChange, placeholder }) => {
  return (
    <Card className="w-full p-4 bg-slate-800">
      <Textarea
        placeholder={placeholder || "Type or paste your content here..."}
        className="min-h-[200px] bg-slate-700 text-white border-slate-600 focus:border-blue-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Card>
  );
};

export default TextArea;
