
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { useToast } from '@/hooks/use-toast';
import { Copy } from 'lucide-react';

interface TextOptions {
  characterCount: number;
  wordCount: number;
  lineCount: number;
  sentenceCount: number;
}

const DummyTextGenerator = () => {
  const { toast } = useToast();
  const [options, setOptions] = useState<TextOptions>({
    characterCount: 27,
    wordCount: 1,
    lineCount: 1,
    sentenceCount: 1
  });
  const [generatedText, setGeneratedText] = useState('');

  const handleOptionChange = (field: keyof TextOptions, value: string) => {
    setOptions(prev => ({
      ...prev,
      [field]: parseInt(value) || 0
    }));
  };

  const generateText = () => {
    const words = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit'];
    let text = '';
    
    // Generate sentences
    for (let i = 0; i < options.sentenceCount; i++) {
      const sentence = [];
      for (let j = 0; j < Math.max(1, Math.floor(options.wordCount / options.sentenceCount)); j++) {
        sentence.push(words[Math.floor(Math.random() * words.length)]);
      }
      text += sentence.join(' ') + '. ';
    }

    // Add line breaks
    text = text.trim().split(' ').reduce((acc, word, i) => {
      if (i > 0 && i % Math.max(1, Math.floor(options.wordCount / options.lineCount)) === 0) {
        return acc + '\n' + word;
      }
      return acc + ' ' + word;
    }).trim();

    // Adjust character count
    if (text.length > options.characterCount) {
      text = text.slice(0, options.characterCount);
    }

    setGeneratedText(text);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedText);
      toast({
        title: "Text copied to clipboard",
        duration: 2000,
      });
    } catch (err) {
      toast({
        title: "Failed to copy text",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  return (
    <Card className="p-6 bg-slate-800">
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1">
              Characters
            </label>
            <Input
              type="number"
              min="1"
              value={options.characterCount}
              onChange={(e) => handleOptionChange('characterCount', e.target.value)}
              className="bg-slate-700 text-white border-slate-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1">
              Words
            </label>
            <Input
              type="number"
              min="1"
              value={options.wordCount}
              onChange={(e) => handleOptionChange('wordCount', e.target.value)}
              className="bg-slate-700 text-white border-slate-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1">
              Lines
            </label>
            <Input
              type="number"
              min="1"
              value={options.lineCount}
              onChange={(e) => handleOptionChange('lineCount', e.target.value)}
              className="bg-slate-700 text-white border-slate-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1">
              Sentences
            </label>
            <Input
              type="number"
              min="1"
              value={options.sentenceCount}
              onChange={(e) => handleOptionChange('sentenceCount', e.target.value)}
              className="bg-slate-700 text-white border-slate-600"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={generateText}
            className="w-full"
            variant="secondary"
          >
            Generate Text
          </Button>
          <Button
            onClick={handleCopy}
            variant="secondary"
            className="px-4"
            disabled={!generatedText}
          >
            <Copy className="w-4 h-4" />
          </Button>
        </div>

        {generatedText && (
          <div className="mt-4">
            <textarea
              readOnly
              value={generatedText}
              className="w-full min-h-[100px] p-3 rounded-md bg-slate-700 text-white border border-slate-600 focus:border-blue-500"
            />
          </div>
        )}
      </div>
    </Card>
  );
};

export default DummyTextGenerator;
