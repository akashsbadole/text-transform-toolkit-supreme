
import React from 'react';

interface TextStatsProps {
  text: string;
}

const TextStats: React.FC<TextStatsProps> = ({ text }) => {
  const getStats = () => {
    const characterCount = text.length;
    const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lineCount = text.trim() ? text.trim().split(/\n/).length : 0;
    const sentenceCount = text.trim() ? text.trim().split(/[.!?]+/).length - 1 : 0;

    return { characterCount, wordCount, lineCount, sentenceCount };
  };

  const stats = getStats();

  return (
    <div className="text-sm text-slate-400 mt-2">
      Character Count: {stats.characterCount} | Word Count: {stats.wordCount} | 
      Line Count: {stats.lineCount} | Sentence Count: {stats.sentenceCount}
    </div>
  );
};

export default TextStats;
