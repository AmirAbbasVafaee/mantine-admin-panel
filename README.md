# Mantine Dashboard

A comprehensive Persian RTL dashboard built with Next.js, TypeScript, and Mantine UI library.

## 🚀 Features

- **Persian RTL Support**: Full right-to-left layout with Persian language
- **Modern UI**: Built with Mantine v8 components
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Dark Mode**: Toggle between light and dark themes
- **Comprehensive Dashboard**: Multiple pages with full CRUD functionality

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
- **Font**: Vazir (Persian font)

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
│   ├── layout.tsx              # Root layout with Mantine provider
│   ├── page.tsx                # Home page (redirects to dashboard)
│   ├── globals.css             # Global styles
│   ├── mantine-dashboard.tsx   # Main dashboard component
│   └── mantine/
│       └── page.tsx            # Dashboard route
└── components/
    └── mantine-provider.tsx    # Mantine theme provider
```

## 🎨 Customization

### Theme Configuration

The theme is configured in `src/components/mantine-provider.tsx`:

- Primary color: Blue
- Font family: Vazir
- Default radius: Medium
- RTL support enabled

### Adding New Pages

1. Add a new case in the `renderPage()` function in `mantine-dashboard.tsx`
2. Create your page component
3. Add navigation link in the `mainLinks` array

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
- Persian font (Vazir)
- RTL-specific components

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

## 📞 Support

For support and questions, please open an issue in the repository.
