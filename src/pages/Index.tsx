
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
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
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <Header />
      <main className="flex-grow p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
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
      </main>
      <Footer />
    </div>
  );
};

export default Index;
