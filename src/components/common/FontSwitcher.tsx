import React from 'react';
import { Menu, Group, Text } from '@mantine/core';
import { IconTypography, IconCheck } from '@tabler/icons-react';
import { useFont, fontDisplayNames, type FontType } from '@/contexts/FontContext';

interface FontSwitcherProps {
  onClose?: () => void;
}

export const FontSwitcher: React.FC<FontSwitcherProps> = ({ onClose }) => {
  const { currentFont, setCurrentFont } = useFont();

  const fonts: FontType[] = ['vazir', 'iran-yekan', 'kalameh', 'peyda', 'yekan-bakh'];

  const handleFontChange = (font: FontType) => {
    setCurrentFont(font);
    // Don't close the dropdown - let user see the font change
  };

  return (
    <>
      <Menu.Label>انتخاب فونت</Menu.Label>
      {fonts.map((font) => (
        <Menu.Item
          key={font}
          leftSection={<IconTypography size={16} />}
          rightSection={
            currentFont === font ? (
              <IconCheck size={16} style={{ color: 'var(--mantine-color-blue-6)' }} />
            ) : null
          }
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleFontChange(font);
          }}
          style={{
            backgroundColor: currentFont === font ? 'var(--mantine-color-blue-0)' : 'transparent',
            fontWeight: currentFont === font ? 600 : 400,
          }}
        >
          <Group gap="xs" justify="space-between" style={{ width: '100%' }}>
            <Text size="sm" fw={currentFont === font ? 600 : 400}>
              {fontDisplayNames[font]}
            </Text>
            <Text size="xs" c="dimmed" style={{ fontFamily: 'monospace' }}>
              {font}
            </Text>
          </Group>
        </Menu.Item>
      ))}
    </>
  );
};