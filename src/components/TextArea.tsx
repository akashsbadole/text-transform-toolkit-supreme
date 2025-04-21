import React from 'react';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onValidate?: () => boolean;
}

const TextArea: React.FC<TextAreaProps> = ({ 
  value, 
  onChange, 
  placeholder,
  onValidate = () => true 
}) => {
  const { toast } = useToast();

  const validateAndUpdate = (newValue: string) => {
    if (newValue.trim() === '') {
      toast({
        title: "Empty Text",
        description: "Please enter some text before transforming",
        variant: "destructive",
        duration: 2000,
      });
      return false;
    }
    onChange(newValue);
    return true;
  };

  return (
    <Card className="w-full p-4 bg-slate-800">
      <Textarea
        placeholder={placeholder || "Type or paste your content here..."}
        className="min-h-[200px] bg-slate-700 text-white border-slate-600 focus:border-blue-500"
        value={value}
        onChange={(e) => validateAndUpdate(e.target.value)}
        onBlur={() => {
          if (value.trim() === '') {
            toast({
              title: "Empty Text",
              description: "Please enter some text to transform",
              variant: "destructive",
              duration: 2000,
            });
          }
        }}
      />
    </Card>
  );
};

export default TextArea;
