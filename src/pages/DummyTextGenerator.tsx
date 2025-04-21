import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const dummyTextTypes = [
  { id: 'lorem', name: 'Lorem Ipsum' },
  { id: 'bacon', name: 'Bacon Ipsum' },
  { id: 'hipster', name: 'Hipster Ipsum' },
  { id: 'pirate', name: 'Pirate Ipsum' },
  { id: 'cupcake', name: 'Cupcake Ipsum' },
  { id: 'zombie', name: 'Zombie Ipsum' },
];

// Word banks for different text types
const wordBanks = {
  lorem: [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
  ],
  bacon: [
    'bacon', 'pork', 'belly', 'meat', 'beef', 'ribs', 'steak', 'sausage',
    'ham', 'chicken', 'turkey', 'drumstick', 'wings', 'tenderloin', 'brisket',
    'jerky', 'meatball', 'pork chop', 'ribeye', 'sirloin', 't-bone', 'filet',
    'mignon', 'ground', 'beef', 'pork', 'loin', 'shoulder', 'roast', 'chop',
    'cutlet', 'fillet', 'strip', 'steak', 'flank', 'skirt', 'round', 'shank',
    'leg', 'thigh', 'breast', 'wing', 'drumstick', 'tender', 'meat', 'protein',
    'fat', 'marble', 'grill', 'smoke', 'roast', 'bake', 'fry', 'sear', 'braise',
    'stew', 'cure', 'season', 'spice', 'herb', 'marinate', 'rub', 'sauce'
  ],
  hipster: [
    'artisan', 'craft', 'bespoke', 'vintage', 'retro', 'organic', 'sustainable',
    'handmade', 'authentic', 'curated', 'minimalist', 'bohemian', 'indie',
    'underground', 'alternative', 'experimental', 'avant-garde', 'conceptual',
    'contemporary', 'modern', 'postmodern', 'deconstructed', 'reconstructed',
    'upcycled', 'repurposed', 'reclaimed', 'vintage', 'thrifted', 'secondhand',
    'pre-loved', 'eco-friendly', 'green', 'conscious', 'mindful', 'intentional',
    'purposeful', 'meaningful', 'authentic', 'genuine', 'real', 'raw', 'unfiltered',
    'unprocessed', 'natural', 'organic', 'local', 'small-batch', 'handcrafted',
    'artisanal', 'crafted', 'designed', 'created', 'made', 'built', 'constructed',
    'assembled', 'curated', 'selected', 'chosen', 'picked', 'gathered', 'collected'
  ],
  pirate: [
    'ahoy', 'matey', 'arrr', 'aye', 'aye-aye', 'blimey', 'booty', 'buccaneer',
    'captain', 'crew', 'doubloon', 'grog', 'hull', 'jolly', 'roger', 'landlubber',
    'loot', 'maroon', 'parrot', 'plunder', 'scurvy', 'sea', 'dog', 'shiver',
    'me', 'timbers', 'swab', 'the', 'deck', 'treasure', 'walk', 'the', 'plank',
    'yo', 'ho', 'ho', 'anchor', 'cannon', 'compass', 'crow\'s', 'nest', 'cutlass',
    'davy', 'jones', 'first', 'mate', 'galley', 'gold', 'pieces', 'of', 'eight',
    'keelhaul', 'kraken', 'mermaid', 'mizzenmast', 'parley', 'peg', 'leg',
    'pirate', 'ship', 'quartermaster', 'rum', 'scallywag', 'sea', 'shanty',
    'spyglass', 'sword', 'telescope', 'tide', 'treasure', 'map', 'wharf'
  ],
  cupcake: [
    'cupcake', 'icing', 'frosting', 'sprinkles', 'vanilla', 'chocolate', 'strawberry',
    'caramel', 'buttercream', 'fondant', 'ganache', 'glaze', 'drizzle', 'topping',
    'filling', 'cream', 'cheese', 'whipped', 'cream', 'meringue', 'batter', 'dough',
    'mix', 'bake', 'decorate', 'sweet', 'sugar', 'flour', 'butter', 'eggs', 'milk',
    'baking', 'powder', 'soda', 'salt', 'vanilla', 'extract', 'cocoa', 'powder',
    'food', 'coloring', 'sprinkles', 'jimmies', 'nonpareils', 'sugar', 'pearls',
    'edible', 'glitter', 'fondant', 'flowers', 'piping', 'bag', 'tip', 'nozzle',
    'cake', 'stand', 'tier', 'layer', 'crumb', 'coat', 'final', 'coat', 'smooth',
    'textured', 'pattern', 'design', 'theme', 'color', 'scheme', 'decoration'
  ],
  zombie: [
    'brains', 'undead', 'walking', 'dead', 'flesh', 'rotten', 'decay', 'grave',
    'tomb', 'cemetery', 'coffin', 'corpse', 'death', 'dying', 'kill', 'murder',
    'blood', 'gore', 'guts', 'organs', 'limbs', 'bones', 'skull', 'skeleton',
    'zombie', 'apocalypse', 'outbreak', 'infection', 'virus', 'disease', 'plague',
    'pandemic', 'epidemic', 'contagion', 'quarantine', 'isolation', 'survival',
    'survivor', 'refugee', 'refuge', 'safe', 'house', 'bunker', 'shelter', 'hideout',
    'weapon', 'gun', 'knife', 'axe', 'bat', 'club', 'sword', 'machete', 'chainsaw',
    'ammo', 'bullet', 'shotgun', 'rifle', 'pistol', 'revolver', 'grenade', 'bomb',
    'explosive', 'trap', 'barricade', 'fence', 'wall', 'gate', 'door', 'window'
  ]
};

// Generate a random sentence
const generateSentence = (wordBank: string[], minWords = 5, maxWords = 15) => {
  const wordCount = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
  const words = Array.from({ length: wordCount }, () => 
    wordBank[Math.floor(Math.random() * wordBank.length)]
  );
  return words.join(' ') + '.';
};

// Generate a paragraph
const generateParagraph = (wordBank: string[], minSentences = 3, maxSentences = 7) => {
  const sentenceCount = Math.floor(Math.random() * (maxSentences - minSentences + 1)) + minSentences;
  const sentences = Array.from({ length: sentenceCount }, () => generateSentence(wordBank));
  return sentences.join(' ');
};

export default function DummyTextGenerator() {
  const [textType, setTextType] = useState('lorem');
  const [paragraphCount, setParagraphCount] = useState(3);
  const [generatedText, setGeneratedText] = useState('');

  const generateDummyText = () => {
    const wordBank = wordBanks[textType as keyof typeof wordBanks] || wordBanks.lorem;
    const paragraphs = Array.from({ length: paragraphCount }, () => 
      generateParagraph(wordBank)
    );
    setGeneratedText(paragraphs.join('\n\n'));
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Dummy Text Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="textType">Text Type</Label>
              <Select value={textType} onValueChange={setTextType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select text type" />
                </SelectTrigger>
                <SelectContent>
                  {dummyTextTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Number of Paragraphs</Label>
              <Slider
                value={[paragraphCount]}
                onValueChange={([value]) => setParagraphCount(value)}
                min={1}
                max={10}
                step={1}
              />
              <div className="text-sm text-muted-foreground">
                {paragraphCount} {paragraphCount === 1 ? 'paragraph' : 'paragraphs'}
              </div>
            </div>

            <Button onClick={generateDummyText} className="w-full">
              Generate Text
            </Button>

            {generatedText && (
              <div className="space-y-2">
                <Label>Generated Text</Label>
                <Textarea
                  value={generatedText}
                  readOnly
                  className="min-h-[200px]"
                />
                <Button
                  variant="outline"
                  onClick={() => navigator.clipboard.writeText(generatedText)}
                  className="w-full"
                >
                  Copy to Clipboard
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 