
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { useToast } from '@/hooks/use-toast';
import { Copy } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const DUMMY_TEXT_TYPES = [
  'Lorem ipsum',
  'Cicero',
  'Cicero (en)',
  'Li Europan lingues',
  'Li Europan lingues (en)',
  'Far far away',
  'Werther',
  'Kafka',
  'Pangram',
  'a-z A-Z 123'
] as const;

type DummyTextType = typeof DUMMY_TEXT_TYPES[number];

interface TextOptions {
  type: DummyTextType;
  count: number;
  countType: 'Words' | 'Characters';
  paragraphs: number;
  displayTags: boolean;
}

const DummyTextGenerator = () => {
  const { toast } = useToast();
  const [options, setOptions] = useState<TextOptions>({
    type: 'Lorem ipsum',
    count: 200,
    countType: 'Words',
    paragraphs: 1,
    displayTags: false
  });
  const [generatedText, setGeneratedText] = useState('');

  const handleOptionChange = (field: keyof TextOptions, value: string | number | boolean) => {
    setOptions(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateText = () => {
    const words = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit'];
    let text = '';
    
    for (let p = 0; p < options.paragraphs; p++) {
      const paragraphWords = [];
      const targetCount = options.countType === 'Words' 
        ? Math.floor(options.count / options.paragraphs)
        : Math.floor(options.count / options.paragraphs / 5);

      while (paragraphWords.length < targetCount) {
        paragraphWords.push(words[Math.floor(Math.random() * words.length)]);
      }

      let paragraphText = paragraphWords.join(' ') + '. ';
      
      if (options.displayTags) {
        paragraphText = `<p>${paragraphText}</p>`;
      }

      text += paragraphText;
    }

    // Truncate based on character count if needed
    if (options.countType === 'Characters') {
      text = text.slice(0, options.count);
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
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1">
              Dummy Text
            </label>
            <Select 
              value={options.type} 
              onValueChange={(value) => handleOptionChange('type', value)}
            >
              <SelectTrigger className="bg-slate-700 text-white border-slate-600">
                <SelectValue placeholder="Select text type" />
              </SelectTrigger>
              <SelectContent>
                {DUMMY_TEXT_TYPES.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1">
              Number
            </label>
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                min="1"
                value={options.count}
                onChange={(e) => handleOptionChange('count', parseInt(e.target.value))}
                className="bg-slate-700 text-white border-slate-600 w-24"
              />
              <Select 
                value={options.countType} 
                onValueChange={(value: 'Words' | 'Characters') => handleOptionChange('countType', value)}
              >
                <SelectTrigger className="w-32 bg-slate-700 text-white border-slate-600">
                  <SelectValue placeholder="Count type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Words">Words</SelectItem>
                  <SelectItem value="Characters">Characters</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1">
              Paragraphs
            </label>
            <Input
              type="number"
              min="1"
              value={options.paragraphs}
              onChange={(e) => handleOptionChange('paragraphs', parseInt(e.target.value))}
              className="bg-slate-700 text-white border-slate-600"
            />
          </div>
          <div className="flex items-center space-x-2 pt-6">
            <input 
              type="checkbox" 
              id="displayTags"
              checked={options.displayTags}
              onChange={(e) => handleOptionChange('displayTags', e.target.checked)}
              className="text-blue-500 bg-slate-700 border-slate-600"
            />
            <label htmlFor="displayTags" className="text-slate-200">
              Display &lt;p&gt; tags
            </label>
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
