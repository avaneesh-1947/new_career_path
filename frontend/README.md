# Fyndor - Frontend

A modern, responsive frontend application built with Next.js 14 for Fyndor.

## 🚀 Features

- **Modern UI/UX**: Beautiful, responsive design with smooth animations
- **Mobile-First**: Optimized for both desktop and mobile devices
- **Type Safety**: Built with TypeScript for better development experience
- **Performance**: Optimized with Next.js 14 features like App Router
- **Accessibility**: WCAG 2.1 compliant design
- **Multilingual**: Support for 5+ Indian languages

## 🛠️ Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Recharts** - Data visualization
- **React Hook Form** - Form management
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Lucide React** - Icon library

## 📁 Project Structure

```
frontend/
├── app/                    # Next.js 14 App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── login/             # Authentication pages
│   ├── dashboard/         # User dashboard
│   ├── aptitude-test/     # Aptitude test page
│   ├── career-mapping/    # Career mapping page
│   ├── colleges/          # College directory
│   └── career-genie/      # AI chatbot page
├── components/            # Reusable components
│   ├── Navbar.tsx         # Navigation component
│   ├── Footer.tsx         # Footer component
│   ├── Hero.tsx           # Hero section
│   ├── Features.tsx       # Features section
│   ├── Stats.tsx          # Statistics section
│   ├── Testimonials.tsx   # Testimonials section
│   ├── CTA.tsx            # Call-to-action section
│   └── LoadingSpinner.tsx # Loading component
├── public/                # Static assets
├── tailwind.config.js     # Tailwind configuration
├── next.config.js         # Next.js configuration
└── package.json           # Dependencies
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3b82f6) - Trust and reliability
- **Secondary**: Green (#22c55e) - Growth and success  
- **Accent**: Yellow (#eab308) - Energy and optimism

### Typography
- **Font Family**: Inter - Modern and readable
- **Font Weights**: 300, 400, 500, 600, 700, 800

### Components
- Consistent design patterns
- Reusable UI components
- Responsive layouts
- Smooth animations

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment setup**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your configuration
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📱 Pages & Features

### 🏠 Home Page
- Hero section with compelling messaging
- Feature highlights
- Statistics and impact metrics
- Testimonials from students
- Call-to-action sections

### 🔐 Authentication
- Login/Register forms
- Social authentication options
- Form validation
- Responsive design

### 📊 Dashboard
- Personalized user overview
- Progress tracking
- Quick actions
- Recent activity
- Career recommendations

### 🧠 Aptitude Test
- Interactive quiz interface
- Progress tracking
- Real-time scoring
- Results analysis
- Career recommendations

### 🗺️ Career Mapping
- Visual career pathways
- Stream selection
- Detailed career information
- Salary trends
- Growth opportunities

### 🏫 College Directory
- Search and filter functionality
- College details and reviews
- Location-based search
- Admission information
- Scholarship details

### 🤖 Career Genie
- AI-powered chatbot
- Real-time conversations
- Suggested actions
- Context-aware responses
- Quick question suggestions

## 🎯 Key Components

### Navbar
- Responsive navigation
- Language selector
- User authentication state
- Mobile menu

### Hero Section
- Animated background elements
- Interactive statistics
- Call-to-action buttons
- Trust indicators

### Features Grid
- Feature cards with icons
- Hover animations
- Responsive layout
- Category organization

### Statistics
- Animated counters
- Progress indicators
- Visual charts
- Impact metrics

### Testimonials
- Carousel component
- User reviews
- Rating displays
- Success stories

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Optimizations
- Touch-friendly interfaces
- Optimized navigation
- Fast loading times
- Offline capabilities

## 🎨 Animations

### Framer Motion
- Page transitions
- Component animations
- Scroll-triggered animations
- Micro-interactions

### Animation Types
- Fade in/out
- Slide transitions
- Scale effects
- Stagger animations

## 🔧 Configuration

### Tailwind CSS
- Custom color palette
- Extended spacing
- Custom animations
- Responsive utilities

### Next.js
- App Router configuration
- Image optimization
- Internationalization
- Performance optimizations

## 📊 Performance

### Optimizations
- Image optimization
- Code splitting
- Lazy loading
- Bundle analysis
- Core Web Vitals

### Metrics
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- First Input Delay (FID)

## 🌍 Internationalization

### Supported Languages
- English (en)
- Hindi (hi)
- Tamil (ta)
- Telugu (te)
- Bengali (bn)

### Implementation
- Next.js i18n
- Language switching
- Localized content
- RTL support (planned)

## 🧪 Testing

### Testing Strategy
- Unit tests with Jest
- Component tests with React Testing Library
- E2E tests with Playwright
- Visual regression tests

### Test Commands
```bash
npm run test          # Run unit tests
npm run test:watch    # Run tests in watch mode
npm run test:e2e      # Run E2E tests
npm run test:coverage # Generate coverage report
```

## 🚀 Deployment

### Build Process
```bash
npm run build         # Build for production
npm run start         # Start production server
npm run lint          # Run ESLint
npm run type-check    # Run TypeScript checks
```

### Deployment Platforms
- **Vercel** (Recommended)
- **Netlify**
- **AWS Amplify**
- **Railway**

### Environment Variables
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key
NEXT_PUBLIC_ANALYTICS_ID=your_id
```

## 🔧 Development

### Code Style
- ESLint configuration
- Prettier formatting
- TypeScript strict mode
- Consistent naming conventions

### Git Workflow
- Feature branches
- Pull request reviews
- Automated testing
- Deployment pipelines

## 📈 Analytics

### Tracking
- Google Analytics 4
- User behavior tracking
- Conversion funnels
- Performance monitoring

### Metrics
- Page views
- User engagement
- Conversion rates
- Performance metrics

## 🔒 Security

### Best Practices
- Input validation
- XSS protection
- CSRF protection
- Secure headers
- Content Security Policy

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if needed
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ for the future of Indian education**
