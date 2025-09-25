"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type FontType = 'vazir' | 'iran-yekan' | 'kalameh' | 'peyda' | 'yekan-bakh';

interface FontContextType {
  currentFont: FontType;
  setCurrentFont: (font: FontType) => void;
  toggleFont: () => void;
}

// Font display names in Persian
export const fontDisplayNames: Record<FontType, string> = {
  'vazir': 'وزیر',
  'iran-yekan': 'ایران یکان',
  'kalameh': 'کلمه',
  'peyda': 'پیدا',
  'yekan-bakh': 'یکان باخ'
};

const FontContext = createContext<FontContextType | undefined>(undefined);

interface FontProviderProps {
  children: ReactNode;
}

export const FontProvider: React.FC<FontProviderProps> = ({ children }) => {
  const [currentFont, setCurrentFont] = useState<FontType>('vazir');

  // Load font preference from localStorage on mount
  useEffect(() => {
    const savedFont = localStorage.getItem('admin-panel-font') as FontType;
    const validFonts: FontType[] = ['vazir', 'iran-yekan', 'kalameh', 'peyda', 'yekan-bakh'];
    if (savedFont && validFonts.includes(savedFont)) {
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
    const fonts: FontType[] = ['vazir', 'iran-yekan', 'kalameh', 'peyda', 'yekan-bakh'];
    const currentIndex = fonts.indexOf(currentFont);
    const nextIndex = (currentIndex + 1) % fonts.length;
    setCurrentFont(fonts[nextIndex]);
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
