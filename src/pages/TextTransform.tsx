import { useState } from 'react';
import { motion } from 'framer-motion';
import Background3D from '../components/Background3D';
import Footer from '../components/Footer';
import Header from '../components/Header';
import TextArea from '../components/TextArea';
import TransformButtons from '../components/TransformButtons';
import TextStats from '../components/TextStats';
import { transformText } from '../utils/textTransforms';
import { useToast } from '@/hooks/use-toast';

const TextTransform = () => {
  const [text, setText] = useState('');
  const { toast } = useToast();

  const handleTransform = (type: string) => {
    if (!text.trim()) {
      toast({
        title: "Empty Text",
        description: "Please enter some text to transform",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    try {
      const transformedText = transformText(text, type);
      setText(transformedText);
      toast({
        title: "Success",
        description: `Text ${type} transformation applied`,
        duration: 1500,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to apply ${type} transformation`,
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  const handleClear = () => {
    setText('');
    toast({
      title: "Text cleared",
      duration: 2000,
    });
  };

  const handleCopy = async () => {
    if (!text.trim()) {
      toast({
        title: "Empty Text",
        description: "There is no text to copy",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

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
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Text Transformer</h2>
            <TextArea
              value={text}
              onChange={setText}
            />
            <p className='text-slate-400 text-[10px] text-center'><i>add some text enable below feature</i></p>
            <TransformButtons
              onTransform={handleTransform}
              onClear={handleClear}
              onCopy={handleCopy}
              disabled={!text.trim()}
            />
            <TextStats text={text} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TextTransform; 