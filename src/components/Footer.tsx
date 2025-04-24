import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  const features = [
    { name: 'Remove Whitespace', icon: '⌫' },
    { name: 'Remove Duplicates', icon: '⇄' },
    { name: 'Remove Line Breaks', icon: '↵' },
    { name: 'Remove Formatting', icon: 'T' },
    { name: 'Bold Text', icon: 'B' },
    { name: 'Italic Text', icon: 'I' },
    { name: 'Strikethrough', icon: 'S̶' },
    { name: 'Underline', icon: 'U̲' },
    { name: 'Sentence case', icon: 'Aa' },
    { name: 'lower case', icon: 'aa' },
    { name: 'UPPER CASE', icon: 'AA' },
    { name: 'Title Case', icon: 'Tt' },
    { name: 'aLtErNaTiNg cAsE', icon: 'aA' },
    { name: 'Superscript', icon: 'ˣ' },
    { name: 'Subscript', icon: 'ₓ' },
    { name: 'Wide Text', icon: 'Ｗ' },
    { name: 'Small Text', icon: 'ᵗ' },
    { name: 'Stacked Text', icon: '⤵' },
    { name: 'Slash Text', icon: '／' },
    { name: 'Zalgo Text', icon: '̊' },
    { name: 'Upside Down', icon: '⥯' },
    { name: 'Reverse Text', icon: '↔' },
    { name: 'Mirror Text', icon: '⋮' },
    { name: 'Unicode', icon: '🅤' },
    { name: 'Bubble Text', icon: 'ⓑ' },
    { name: 'Base64 Encode', icon: '64' },
    { name: 'Base64 Decode', icon: '64⁻¹' },
    { name: 'URL Encode', icon: '🔗' },
    { name: 'URL Decode', icon: '🔓' },
    { name: 'JSON Stringify', icon: '{ }' },
    { name: 'Binary Code', icon: '01' },
    { name: 'Copy to Clipboard', icon: '⎘' },
    { name: 'CSV to JSON', icon: '📊' },
    { name: 'Caesar Cipher', icon: '🔐' },
    { name: 'HTML Formatter', icon: '🌐' },
    { name: 'Hex Converter', icon: '🔢' },
    { name: 'JSON Formatter', icon: '📝' },
    { name: 'MD5 Hash', icon: '🔑' },
    { name: 'Morse Code', icon: '📡' },
    { name: 'Number Sorter', icon: '🔢' },
    { name: 'ROT13', icon: '🔄' },
    { name: 'Regex Tester', icon: '🔍' },
    { name: 'Slugify', icon: '🔗' },
    { name: 'UTF-8', icon: '🌍' },
    { name: 'UTM Builder', icon: '📊' },
    { name: 'XML Formatter', icon: '📄' }
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-12 py-8 backdrop-blur-lg bg-white/5 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Available Text Transformations
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 p-2 rounded-md bg-white/5 hover:bg-white/10 transition-colors"
            >
              <span className="text-lg">{feature.icon}</span>
              <span className="text-sm text-gray-300">{feature.name}</span>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Text Transform Toolkit. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
