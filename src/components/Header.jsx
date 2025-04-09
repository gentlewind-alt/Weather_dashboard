import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

function Header({ darkMode, setDarkMode }) {
  return (
    <div className="flex justify-between items-center p-5 px-6 border-b border-black/20">
      <motion.h1 
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 100, y: 0 }}
        className="text-2xl font-bold text-white"
      >
        Weather Dashboard
      </motion.h1>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        
        onClick={() => setDarkMode(!darkMode)}
        className="text-white pl-1 pr-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
      >
        {darkMode ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
      </motion.button>
    </div>
  );
}

export default Header;