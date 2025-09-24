# Iran Yekan Font CDN

A beautiful Persian font for web applications, hosted on JSDelivr CDN for easy integration.

## 🚀 Quick Start

### Method 1: CSS Link (Recommended)
```html
<link rel="stylesheet" href="https://raw.githubusercontent.com/AmirAbbasVafaee/iran-yekan-fn-cdn/main/css/iran-yekan.css">
```

### Method 2: Import in CSS
```css
@import url('https://raw.githubusercontent.com/AmirAbbasVafaee/iran-yekan-fn-cdn/main/css/iran-yekan.css');
```

## 📖 Usage

### Basic Usage
```css
body {
  font-family: 'IranYekan', 'Vazir', 'Tahoma', sans-serif;
  direction: rtl;
  text-align: right;
}
```

### Using CSS Classes
```html
<div class="iran-yekan-text">متن فارسی شما</div>
<h1 class="iran-yekan-heading">عنوان فارسی</h1>
<p class="iran-yekan-body">متن بدنه فارسی</p>
```

### Font Weights
- **Thin (100)**: `font-weight: 100;` or `.iran-yekan-thin`
- **Light (300)**: `font-weight: 300;` or `.iran-yekan-light`
- **Normal (400)**: `font-weight: normal;` or `.iran-yekan-text`
- **Medium (500)**: `font-weight: 500;` or `.iran-yekan-medium`
- **Bold (700)**: `font-weight: bold;` or `.iran-yekan-bold`
- **ExtraBold (800)**: `font-weight: 800;` or `.iran-yekan-extra-bold`
- **Black (900)**: `font-weight: 900;` or `.iran-yekan-black`
- **ExtraBlack (950)**: `font-weight: 950;` or `.iran-yekan-extra-black`

## 🎨 Available Classes

### Typography
- `.iran-yekan-text` - General Persian text
- `.iran-yekan-heading` - Persian headings
- `.iran-yekan-body` - Persian body text
- `.iran-yekan-thin` - Thin weight text (100)
- `.iran-yekan-light` - Light weight text (300)
- `.iran-yekan-medium` - Medium weight text (500)
- `.iran-yekan-bold` - Bold text (700)
- `.iran-yekan-extra-bold` - Extra bold text (800)
- `.iran-yekan-black` - Black weight text (900)
- `.iran-yekan-extra-black` - Extra black weight text (950)

### Form Elements
- `.iran-yekan-input` - Persian form inputs
- `.iran-yekan-button` - Persian buttons
- `.iran-yekan-label` - Persian labels

### Layout Components
- `.iran-yekan-table` - Persian tables
- `.iran-yekan-nav` - Persian navigation
- `.iran-yekan-card` - Persian cards
- `.iran-yekan-modal` - Persian modals
- `.iran-yekan-search` - Persian search
- `.iran-yekan-pagination` - Persian pagination

### UI Components
- `.iran-yekan-badge` - Persian badges
- `.iran-yekan-datetime` - Persian date/time
- `.iran-yekan-numbers` - Persian numbers
- `.iran-yekan-currency` - Persian currency
- `.iran-yekan-list` - Persian lists

### Messages
- `.iran-yekan-error` - Persian error messages
- `.iran-yekan-success` - Persian success messages
- `.iran-yekan-warning` - Persian warning messages
- `.iran-yekan-info` - Persian info messages

### Advanced Components
- `.iran-yekan-tooltip` - Persian tooltips
- `.iran-yekan-dropdown` - Persian dropdowns
- `.iran-yekan-checkbox` - Persian checkboxes
- `.iran-yekan-radio` - Persian radio buttons
- `.iran-yekan-progress` - Persian progress bars
- `.iran-yekan-breadcrumb` - Persian breadcrumbs
- `.iran-yekan-tabs` - Persian tabs
- `.iran-yekan-accordion` - Persian accordions
- `.iran-yekan-timeline` - Persian timelines
- `.iran-yekan-stepper` - Persian steppers
- `.iran-yekan-notification` - Persian notifications
- `.iran-yekan-alert` - Persian alerts
- `.iran-yekan-skeleton` - Persian skeletons
- `.iran-yekan-loading` - Persian loading states
- `.iran-yekan-empty` - Persian empty states

## 💻 Integration Examples

### React/Next.js
```jsx
import React from 'react';

function PersianComponent() {
  return (
    <div className="iran-yekan-text">
      <h1 className="iran-yekan-heading">سلام دنیا</h1>
      <p className="iran-yekan-body">این یک متن فارسی است</p>
    </div>
  );
}
```

### Mantine UI
```jsx
import { Text, Button, Card } from '@mantine/core';

function MantinePersianComponent() {
  return (
    <Card className="iran-yekan-card">
      <Text className="iran-yekan-text">متن فارسی</Text>
      <Button className="iran-yekan-button">دکمه فارسی</Button>
    </Card>
  );
}
```

### Tailwind CSS
```html
<div class="iran-yekan-text text-right">
  <h1 class="iran-yekan-heading text-2xl">عنوان فارسی</h1>
  <p class="iran-yekan-body text-gray-600">متن بدنه فارسی</p>
</div>
```

## 🌐 Browser Support

- Chrome 6+
- Firefox 3.6+
- Safari 5.1+
- Edge 12+
- IE 9+

## 📱 Responsive Design

The font works perfectly with responsive design frameworks:

```css
/* Mobile */
@media (max-width: 768px) {
  .iran-yekan-text {
    font-size: 14px;
    line-height: 1.6;
  }
}

/* Tablet */
@media (min-width: 769px) and (max-width: 1024px) {
  .iran-yekan-text {
    font-size: 16px;
    line-height: 1.7;
  }
}

/* Desktop */
@media (min-width: 1025px) {
  .iran-yekan-text {
    font-size: 18px;
    line-height: 1.8;
  }
}
```

## 🎯 Performance

- **Font Display**: Uses `font-display: swap` for optimal loading
- **Unicode Range**: Optimized for Persian characters only (`U+0600-06FF, U+0750-077F, U+08A0-08FF, U+FB50-FDFF, U+FE70-FEFF`)
- **CDN**: Served via JSDelivr for global performance
- **Compression**: WOFF2 format for smallest file size

### Unicode Range Explanation

The `unicode-range` property tells the browser which characters should use this font. This means:

- **Persian/Arabic text** → Iran Yekan font loads
- **English/Latin text** → Default system font (no Iran Yekan loaded)

**Example:**
```html
<p>Hello World - این متن فارسی است</p>
```
- "Hello World" → Uses default font (no Iran Yekan loaded)
- "این متن فارسی است" → Uses Iran Yekan font (loaded only for Persian text)

This makes your font CDN more efficient by only loading the Persian font when Persian text is actually present on the page!

## 📝 License

[Your License Here - Please specify your font license]

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🆘 Support

If you have any questions or need help:

1. Open an issue on GitHub
2. Check the examples above
3. Test with the CDN URL directly

## 🔗 Links

- **CDN URL**: `https://raw.githubusercontent.com/AmirAbbasVafaee/iran-yekan-fn-cdn/main/css/iran-yekan.css`
- **GitHub Repository**: `https://github.com/AmirAbbasVafaee/iran-yekan-fn-cdn`
- **JSDelivr**: `https://www.jsdelivr.com/`

## 📊 Usage Statistics

[Add usage statistics if available]

---

**Made with ❤️ for the Persian developer community**

