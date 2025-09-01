# 🎉 Next.js Contact Form with shadcn/ui

A beautiful, modern contact form built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui components.

## ✨ Features

- **Modern UI**: Clean, responsive design with beautiful gradients and shadows
- **Form Validation**: Real-time client-side validation with error messages
- **Accessibility**: WCAG compliant with proper labels and keyboard navigation
- **Dark Mode**: Full dark mode support with CSS variables
- **Responsive**: Mobile-first design that works on all devices
- **TypeScript**: Full type safety throughout the application
- **shadcn/ui**: High-quality, accessible UI components

## 🚀 Tech Stack

- **Framework**: Next.js 15.5.2 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3.4.0
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Form Handling**: React hooks with custom validation
- **Build Tool**: Turbopack for fast development

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd shadcn-test
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Components Used

### shadcn/ui Components
- **Button**: Multiple variants with loading states
- **Input**: Form inputs with proper styling and focus states
- **Textarea**: Multi-line text input for messages
- **Label**: Accessible form labels with Radix UI
- **Card**: Container component with header, content, and footer

### Custom Components
- **ContactForm**: Main form component with validation and submission handling

## 📋 Form Features

### Form Fields
- **Name**: Required, minimum 2 characters
- **Email**: Required, valid email format validation
- **Phone**: Optional, but validated if provided
- **Subject**: Required, minimum 5 characters
- **Message**: Required, minimum 10 characters

### User Experience
- **Real-time Validation**: Errors appear as you type
- **Loading States**: Spinner during form submission
- **Success Feedback**: Green success message with auto-dismiss
- **Error Handling**: Red error messages with retry options
- **Form Reset**: Clears form after successful submission

## 🎯 Project Structure

```
src/
├── app/
│   ├── globals.css          # Tailwind CSS + shadcn variables
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Contact form page
├── components/
│   ├── ui/                  # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── label.tsx
│   │   └── card.tsx
│   └── contact-form.tsx     # Main contact form
└── lib/
    └── utils.ts             # Utility functions
```

## 🔧 Configuration Files

- **`tailwind.config.ts`**: Tailwind CSS configuration with shadcn theme
- **`postcss.config.mjs`**: PostCSS configuration for Tailwind
- **`components.json`**: shadcn/ui configuration
- **`tsconfig.json`**: TypeScript configuration

## 🎨 Design System

### Colors
- **Primary**: HSL-based color system with dark mode support
- **Semantic Colors**: Success, error, warning, and info states
- **Neutral Colors**: Background, foreground, muted, and accent colors

### Typography
- **Font Sizes**: Consistent scale from xs to 6xl
- **Font Weights**: Light, normal, medium, semibold, bold
- **Line Heights**: Optimized for readability

### Spacing
- **Padding/Margin**: Tailwind's spacing scale
- **Gap**: Consistent spacing between elements
- **Border Radius**: Rounded corners for modern look

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔮 Next Steps

### Backend Integration
```typescript
// Replace the simulated API call in contact-form.tsx
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});
```

### Email Service Integration
- **SendGrid**: Popular email service with good free tier
- **Resend**: Modern email API with great developer experience
- **Nodemailer**: Self-hosted email solution

### Database Integration
- **PostgreSQL**: Robust relational database
- **MongoDB**: NoSQL database for flexible data
- **Supabase**: Open-source Firebase alternative

## 🧪 Testing

### Unit Tests
```bash
npm install -D jest @testing-library/react @testing-library/jest-dom
npm test
```

### E2E Tests
```bash
npm install -D playwright
npx playwright test
```

## 📝 License

MIT License - feel free to use this project for your own applications!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Built with ❤️ using Next.js, TypeScript, Tailwind CSS, and shadcn/ui**
