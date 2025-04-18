
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-800 p-4 mt-8">
      <div className="max-w-4xl mx-auto text-center text-slate-400">
        <p>Text Transform Toolkit &copy; {new Date().getFullYear()}</p>
        <p className="text-sm mt-2">
          A comprehensive tool for all your text transformation needs
        </p>
      </div>
    </footer>
  );
};

export default Footer;
