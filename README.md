# Mantine Dashboard

A comprehensive Persian RTL dashboard built with Next.js, TypeScript, and Mantine UI library.

## 🚀 Features

- **Persian RTL Support**: Full right-to-left layout with Persian language
- **Modern UI**: Built with Mantine v8 components
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Dark Mode**: Toggle between light and dark themes
- **Font Switcher**: Switch between Vazir and Iran Yekan fonts
- **Color Themes**: Multiple color schemes (Blue, Green, Purple, Orange)
- **Comprehensive Dashboard**: Multiple pages with full CRUD functionality
- **Advanced Components**: Tables, forms, modals, notifications, and more

## 📋 Pages

### 🏠 Dashboard
- Overview statistics and metrics
- Recent orders and activities
- Quick action buttons
- Performance indicators

### 👥 Users Management
- User listing with search and filters
- Add, edit, view, and delete users
- Role-based access control
- User status management

### 🛒 Orders Management
- Order tracking and management
- Status updates and notifications
- Customer information
- Payment and shipping details

### 📦 Products Management
- Product catalog management
- Inventory tracking
- Category organization
- Product details and specifications

### 📊 Reports & Analytics
- Sales analytics and charts
- Performance metrics
- Export functionality
- Real-time data visualization

### ⚙️ Settings
- Profile management
- Notification preferences
- Security settings
- System configuration

## 🛠 Tech Stack

- **Framework**: Next.js 15.5.2 with App Router
- **Language**: TypeScript
- **UI Library**: Mantine v8
- **Icons**: Tabler Icons
- **Styling**: Mantine's built-in styling system
- **Fonts**: Vazir & Iran Yekan (Persian fonts)
- **State Management**: React Context API
- **Font CDN**: GitHub + Raw URLs for Iran Yekan font

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mantine-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Home page (redirects to dashboard)
│   ├── globals.css             # Global styles
│   ├── login/
│   │   └── page.tsx            # Login page
│   └── mantine/
│       ├── layout.tsx          # Dashboard layout
│       ├── page.tsx            # Dashboard home
│       ├── dashboard/          # Dashboard pages
│       ├── users/              # User management
│       ├── orders/             # Order management
│       ├── products/           # Product management
│       ├── reports/            # Reports & analytics
│       └── settings/           # Settings page
├── components/
│   ├── common/                 # Shared components
│   │   ├── FontSwitcher.tsx    # Font switching component
│   │   ├── GlobalSearch.tsx    # Global search
│   │   ├── PageHeader.tsx      # Page headers
│   │   └── TablePagination.tsx # Table pagination
│   ├── dashboard/              # Dashboard components
│   ├── forms/                  # Form components
│   ├── modals/                 # Modal components
│   ├── tables/                 # Table components
│   ├── mantine-provider.tsx    # Mantine theme provider
│   └── ThemeWrapper.tsx        # Theme wrapper
├── contexts/
│   ├── FontContext.tsx         # Font switching context
│   └── ThemeContext.tsx        # Theme management context
├── hooks/                      # Custom React hooks
├── types/                      # TypeScript type definitions
├── utils/                      # Utility functions
└── styles/
    └── fonts.css               # Font styles and imports
```

## 🎨 Customization

### Theme Configuration

The theme is configured in `src/components/mantine-provider.tsx`:

- **Color Themes**: Blue, Green, Purple, Orange
- **Font Support**: Vazir (default) and Iran Yekan
- **Default radius**: Medium
- **RTL support**: Enabled

### Font Switching

The dashboard includes a powerful font switching system:

- **FontSwitcher Component**: Toggle between Vazir and Iran Yekan
- **FontContext**: Global font state management
- **Persistent Storage**: Font choice saved in localStorage
- **Universal Application**: All components respect font choice

**Usage:**
```tsx
import { useFont } from '@/contexts/FontContext';

function MyComponent() {
  const { currentFont, setCurrentFont, toggleFont } = useFont();
  
  return (
    <div>
      <p>Current font: {currentFont}</p>
      <button onClick={toggleFont}>Switch Font</button>
    </div>
  );
}
```

### Color Themes

Switch between multiple color schemes:
- **Blue** (default)
- **Green**
- **Purple** 
- **Orange**

### Adding New Pages

1. Create a new page component in `src/components/dashboard/`
2. Add route in `src/app/mantine/[page]/page.tsx`
3. Add navigation link in `DashboardLayout.tsx`
4. Update the `activePage` logic

## 📱 Responsive Design

The dashboard is fully responsive with:
- Mobile-first approach
- Collapsible sidebar on mobile
- Touch-friendly interface
- Optimized layouts for all screen sizes

## 🌐 RTL Support

Full Persian RTL support including:
- Right-to-left text direction
- Proper layout alignment
- Persian fonts (Vazir & Iran Yekan)
- RTL-specific components
- Font switching with RTL preservation

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- TypeScript for type safety
- Functional components with hooks
- Mantine components for consistency
- Persian comments and text

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 🎨 Iran Yekan Font CDN

This project includes a custom Iran Yekan font CDN implementation:

### Font CDN Repository
- **Repository**: [iran-yekan-fn-cdn](https://github.com/AmirAbbasVafaee/iran-yekan-fn-cdn)
- **CDN URL**: `https://raw.githubusercontent.com/AmirAbbasVafaee/iran-yekan-fn-cdn/main/css/iran-yekan.css`
- **Font Weights**: 8 different weights (Thin, Light, Normal, Medium, Bold, ExtraBold, Black, ExtraBlack)

### Features
- **WOFF2 Format**: Optimized for web performance
- **Unicode Range**: Optimized for Persian/Arabic characters only
- **Font Display**: Uses `font-display: swap` for optimal loading
- **RTL Support**: Full right-to-left text support
- **Universal Classes**: Comprehensive CSS classes for all UI components

### Usage in Other Projects
```html
<link rel="stylesheet" href="https://raw.githubusercontent.com/AmirAbbasVafaee/iran-yekan-fn-cdn/main/css/iran-yekan.css">
```

```css
body {
  font-family: 'IranYekan', sans-serif;
  direction: rtl;
  text-align: right;
}
```

## 📞 Support

For support and questions, please open an issue in the repository.

## 🎉 Recent Updates

### v2.0.0 - Font Switcher & Enhanced UI
- ✅ **Font Switcher**: Toggle between Vazir and Iran Yekan fonts
- ✅ **Iran Yekan CDN**: Custom font CDN with 8 font weights
- ✅ **Color Themes**: Multiple color schemes (Blue, Green, Purple, Orange)
- ✅ **Enhanced Components**: Improved tables, forms, and modals
- ✅ **Better RTL Support**: Enhanced right-to-left layout
- ✅ **Responsive Design**: Optimized for all screen sizes
- ✅ **State Management**: React Context for theme and font management
