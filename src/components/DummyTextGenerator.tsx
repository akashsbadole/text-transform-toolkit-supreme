import React, { useState, useEffect } from 'react';
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

const DUMMY_TEXT_SAMPLES = {
  'Lorem ipsum': [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
  ],
  'Cicero': [
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
    'Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.'
  ],
  'Cicero (en)': [
    'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized.',
    'These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled.',
    'When nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided.'
  ],
  'Far far away': [
    'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.',
    'Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.',
    'A small river named Duden flows by their place and supplies it with the necessary regelialia.'
  ],
  'Werther': [
    'I am proud of my heart alone, it is the source of both my suffering and my strength.',
    'How my heart beats when I see her walking across the fields in the distance.',
    'Ah, could I but press her to my heart, and feel the beating of her heart against mine!'
  ],
  'Kafka': [
    'Someone must have slandered Josef K., for one morning, without having done anything truly wrong, he was arrested.',
    'As Gregor Samsa awoke one morning from uneasy dreams, he found himself transformed in his bed into a gigantic insect.',
    'In the struggle between yourself and the world, back the world.'
  ],
  'Pangram': [
    'The quick brown fox jumps over the lazy dog.',
    'Pack my box with five dozen liquor jugs.',
    'Sphinx of black quartz, judge my vow.'
  ],
  'a-z A-Z 123': [
    'abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789',
    'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z',
    '1 2 3 4 5 6 7 8 9 0'
  ],
  'Li Europan lingues': [
    'Li Europan lingues es membres del sam familie. Lor separat existentie es un myth.',
    'Por scientie, musica, sport etc, litot Europa usa li sam vocabular.',
    'Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules.'
  ],
  'Li Europan lingues (en)': [
    'The European languages are members of the same family. Their separate existence is a myth.',
    'For science, music, sport, etc, Europe uses the same vocabulary.',
    'The languages differ only in their grammar, their pronunciation and the most common words.'
  ]
};

interface TextOptions {
  type: typeof DUMMY_TEXT_TYPES[number];
  count: number;
  countType: 'Characters' | 'Sentences';
  paragraphs: number;
  displayTags: boolean;
}

const DummyTextGenerator = () => {
  const { toast } = useToast();
  const [options, setOptions] = useState<TextOptions>({
    type: 'Lorem ipsum',
    count: 200,
    countType: 'Characters',
    paragraphs: 1,
    displayTags: false
  });
  const [generatedText, setGeneratedText] = useState('');

  // Sample text to show before any interaction
  const sampleText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

  // Generate default text on component mount
  useEffect(() => {
    setGeneratedText(sampleText);
  }, []);

  const handleOptionChange = (field: keyof TextOptions, value: string | number | boolean) => {
    setOptions(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateText = () => {
    const sampleTexts = DUMMY_TEXT_SAMPLES[options.type];
    let text = '';
    
    for (let p = 0; p < options.paragraphs; p++) {
      const paragraphTexts = [];
      const targetCount = options.countType === 'Sentences' 
        ? Math.min(options.count, sampleTexts.length)
        : Math.floor(options.count / options.paragraphs);

      let currentLength = 0;
      for (const sample of sampleTexts) {
        if (options.countType === 'Sentences' && paragraphTexts.length >= targetCount) break;
        
        if (options.countType === 'Characters' && currentLength + sample.length > targetCount) break;
        
        paragraphTexts.push(sample);
        currentLength += sample.length;
      }

      let paragraphText = paragraphTexts.join(' ') + '. ';
      
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
        {/* Sample text area */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-slate-200">
              Sample Text
            </label>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(sampleText);
                toast({
                  title: "Sample text copied to clipboard",
                  duration: 2000,
                });
              }}
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-white"
            >
              Copy<Copy className="w-4 h-4 bg-blue" />
            </Button>
          </div>
          <textarea
            readOnly
            value={sampleText}
            className="w-full min-h-[100px] p-3 rounded-md bg-slate-700 text-white border border-slate-600 focus:border-blue-500"
          />
        </div>

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
                onValueChange={(value: 'Characters' | 'Sentences') => handleOptionChange('countType', value)}
              >
                <SelectTrigger className="w-32 bg-slate-700 text-white border-slate-600">
                  <SelectValue placeholder="Count type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Characters">Characters</SelectItem>
                  <SelectItem value="Sentences">Sentences</SelectItem>
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
