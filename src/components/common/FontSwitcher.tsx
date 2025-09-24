import React from 'react';
import { ActionIcon, Tooltip } from '@mantine/core';
import { IconTypography, IconLetterA } from '@tabler/icons-react';

interface FontSwitcherProps {
  currentFont: 'vazir' | 'iran-yekan';
  onFontChange: (font: 'vazir' | 'iran-yekan') => void;
}

export const FontSwitcher: React.FC<FontSwitcherProps> = ({ currentFont, onFontChange }) => {
  const handleFontToggle = () => {
    const newFont = currentFont === 'vazir' ? 'iran-yekan' : 'vazir';
    onFontChange(newFont);
  };

  return (
    <Tooltip 
      label={`تغییر فونت به ${currentFont === 'vazir' ? 'ایران یکان' : 'وزیر'}`}
      position="bottom"
      withArrow
    >
      <ActionIcon
        variant="light"
        size="lg"
        onClick={handleFontToggle}
        style={{
          transition: 'all 0.2s ease',
        }}
      >
        {currentFont === 'vazir' ? (
          <IconTypography size={20} />
        ) : (
          <IconLetterA size={20} />
        )}
      </ActionIcon>
    </Tooltip>
  );
};
