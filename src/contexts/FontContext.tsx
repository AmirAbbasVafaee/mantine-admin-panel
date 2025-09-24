"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type FontType = 'vazir' | 'iran-yekan';

interface FontContextType {
  currentFont: FontType;
  setCurrentFont: (font: FontType) => void;
  toggleFont: () => void;
}

const FontContext = createContext<FontContextType | undefined>(undefined);

interface FontProviderProps {
  children: ReactNode;
}

export const FontProvider: React.FC<FontProviderProps> = ({ children }) => {
  const [currentFont, setCurrentFont] = useState<FontType>('vazir');

  // Load font preference from localStorage on mount
  useEffect(() => {
    const savedFont = localStorage.getItem('admin-panel-font') as FontType;
    if (savedFont && (savedFont === 'vazir' || savedFont === 'iran-yekan')) {
      setCurrentFont(savedFont);
    }
  }, []);

  // Save font preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('admin-panel-font', currentFont);
    
    // Apply font to document body
    document.body.className = document.body.className.replace(/font-\w+/g, '');
    document.body.classList.add(`font-${currentFont}`);
  }, [currentFont]);

  const toggleFont = () => {
    setCurrentFont(prev => prev === 'vazir' ? 'iran-yekan' : 'vazir');
  };

  const value: FontContextType = {
    currentFont,
    setCurrentFont,
    toggleFont,
  };

  return (
    <FontContext.Provider value={value}>
      {children}
    </FontContext.Provider>
  );
};

export const useFont = (): FontContextType => {
  const context = useContext(FontContext);
  if (context === undefined) {
    throw new Error('useFont must be used within a FontProvider');
  }
  return context;
};
