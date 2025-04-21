import { useState } from 'react';
import { motion } from 'framer-motion';
import Background3D from '../components/Background3D';
import Footer from '../components/Footer';
import { useSessionStorage } from '../hooks/useSessionStorage';
import { useToast } from '@/hooks/use-toast';

const TextTransform = () => {
  const { sessionData, saveSession, clearSessionData } = useSessionStorage();
  const [text, setText] = useState(sessionData?.text || '');
  const { toast } = useToast();
  const [stats, setStats] = useState(sessionData?.stats || {
    characters: 0,
    words: 0,
    lines: 0,
    sentences: 0
  });

  const updateStats = (newText: string) => {
    setText(newText);
    const newStats = {
      characters: newText.length,
      words: newText.trim() === '' ? 0 : newText.trim().split(/\s+/).length,
      lines: newText === '' ? 0 : newText.split('\n').length,
      sentences: newText === '' ? 0 : newText.split(/[.!?]+/).length - 1
    };
    setStats(newStats);
    saveSession({
      text: newText,
      stats: newStats
    });
  };

  const handleTransform = (action: () => void, label: string) => {
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
      action();
      toast({
        title: "Text Transformed",
        description: `Successfully applied ${label}`,
        duration: 1500,
      });
    } catch (error) {
      toast({
        title: "Transform Failed",
        description: `Failed to apply ${label}. Please try again.`,
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  const transformButtons = [
    { label: 'Remove Whitespace', icon: '⌫', action: () => setText(text.replace(/\s+/g, ' ').trim()) },
    { label: 'Remove Duplicates', icon: '⇄', action: () => setText([...new Set(text.split('\n'))].join('\n')) },
    { label: 'Remove Line Breaks', icon: '↵', action: () => setText(text.replace(/\n/g, ' ')) },
    { label: 'Remove Formatting', icon: 'T', action: () => setText(text.replace(/[^\w\s]/g, '')) },
    { label: 'Bold Text', icon: 'B', action: () => setText(`**${text}**`) },
    { label: 'Italic Text', icon: 'I', action: () => setText(`*${text}*`) },
    { label: 'Strikethrough', icon: 'S̶', action: () => setText(`~~${text}~~`) },
    { label: 'Underline', icon: 'U̲', action: () => setText(`__${text}__`) },
    { label: 'Sentence case', icon: 'Aa', action: () => setText(text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()) },
    { label: 'lower case', icon: 'aa', action: () => setText(text.toLowerCase()) },
    { label: 'UPPER CASE', icon: 'AA', action: () => setText(text.toUpperCase()) },
    { label: 'Title Case', icon: 'Tt', action: () => setText(text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')) },
    { label: 'aLtErNaTiNg cAsE', icon: 'aA', action: () => setText(text.split('').map((char, i) => i % 2 === 0 ? char.toLowerCase() : char.toUpperCase()).join('')) },
    { label: 'Base64 Encode', icon: '64', action: () => setText(btoa(text)) },
    { label: 'Base64 Decode', icon: '64⁻¹', action: () => setText(atob(text)) },
    { label: 'URL Encode', icon: '🔗', action: () => setText(encodeURIComponent(text)) },
    { label: 'URL Decode', icon: '🔓', action: () => setText(decodeURIComponent(text)) },
    { label: 'JSON Stringify', icon: '{ }', action: () => setText(JSON.stringify(text)) }
  ];

  const handleClear = () => {
    setText('');
    setStats({
      characters: 0,
      words: 0,
      lines: 0,
      sentences: 0
    });
    clearSessionData();
    toast({
      title: "Text Cleared",
      duration: 1500,
    });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-primary-dark to-black text-white overflow-hidden">
      <Background3D />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-2 text-white">
            Text Transformer
          </h1>
          <p className="text-gray-400">Transform, encode, and format your text with ease</p>
        </motion.div>

        {/* Main Text Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="backdrop-blur-lg bg-white/10 rounded-lg p-4 mb-6 shadow-xl"
        >
          <textarea
            className="w-full h-64 bg-black/50 text-white p-4 rounded-lg border border-white/20 focus:border-accent focus:ring-1 focus:ring-accent outline-none resize-none"
            placeholder="Type or paste your content here..."
            value={text}
            onChange={(e) => updateStats(e.target.value)}
          />
        </motion.div>

        {/* Transform Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mb-6"
        >
          {transformButtons.map((button, index) => (
            <button
              key={index}
              onClick={() => handleTransform(button.action, button.label)}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <span className="text-lg mr-2">{button.icon}</span>
              {button.label}
            </button>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-gray-400"
        >
          <p>Characters: {stats.characters} | Words: {stats.words} | Lines: {stats.lines} | Sentences: {stats.sentences}</p>
        </motion.div>

        {/* Clear Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-6"
        >
          <button
            onClick={handleClear}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
          >
            Clear All
          </button>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TextTransform; 