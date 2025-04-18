
import { useState } from 'react';
import TextArea from '../components/TextArea';
import TransformButtons from '../components/TransformButtons';
import TextStats from '../components/TextStats';
import { transformText } from '../utils/textTransforms';
import { useToast } from '../components/ui/use-toast';

const Index = () => {
  const [text, setText] = useState('');
  const { toast } = useToast();

  const handleTransform = (type: string) => {
    setText(transformText(text, type));
  };

  const handleClear = () => {
    setText('');
    toast({
      title: "Text cleared",
      duration: 2000,
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard",
        duration: 2000,
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Text Transform Toolkit</h1>
        <TextArea
          value={text}
          onChange={setText}
        />
        <TransformButtons
          onTransform={handleTransform}
          onClear={handleClear}
          onCopy={handleCopy}
        />
        <TextStats text={text} />
      </div>
    </div>
  );
};

export default Index;
