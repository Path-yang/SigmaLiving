# SilverSigma

A comprehensive senior-focused web application designed to enhance quality of life through AI companionship, hobby exploration, and social connectivity. Built with modern web technologies and accessibility-first design principles.

## 🌟 Live Demo

**🌐 Live Application:** [View SilverSigma](https://silversigma.vercel.app)

## 🚀 Key Features

### 🤖 AI Companion with Interactive Avatar
- **Real-time Voice Chat**: Powered by HeyGen streaming avatar technology
- **Multi-language Support**: English, Mandarin, Bahasa Melayu, and Tamil
- **Visual Avatar**: Real-time lip-sync and natural conversation flow
- **Text & Voice Options**: Choose between voice or text-based interaction
- **Customizable Settings**: Adjust avatar quality, voice settings, and language preferences

### 🎯 Comprehensive Hobby Hub
- **6 Major Categories**: Active Hobbies, Creative Arts, Social Games, Learning, Community Service, and Wellness
- **30+ Hobby Options**: From gardening and painting to mahjong and tai chi
- **Detailed Starter Guides**: Complete equipment lists, where to buy, and local resources
- **Smart Search & Filtering**: Find hobbies by category or search terms
- **Daily Hobby Suggestions**: Personalized recommendations to discover new interests

### 📸 SeniorGram - Social Feed
- **Safe Social Sharing**: Private feed for family and friends
- **Photo & Video Support**: Share moments with easy-to-use interface
- **Interactive Features**: Like, comment, share, and bookmark posts
- **Hashtag Integration**: Connect with community through topic tags
- **Accessibility-First Design**: Large text, high contrast, and intuitive navigation

### 🏫 Community Classes Integration
- **32+ Workshop Options**: Real community classes across Singapore
- **Smart Filtering**: Find classes by hobby interest or location
- **Easy Registration**: Simple booking system with emergency contact collection
- **Real-time Availability**: Live participant counts and booking status
- **Location-Based**: Singapore community centers and venues

### 👤 User Profile & Settings
- **Personal Dashboard**: Activity tracking and statistics
- **Accessibility Controls**: Adjustable text size and language preferences
- **Privacy Settings**: Control who can see your content
- **Activity History**: Track your posts, hobbies, and community involvement

## 🛠️ Technical Stack

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** + **shadcn/ui** components
- **React 18** with modern hooks
- **FontAwesome** icons
- **Lucide React** icons

### Backend & APIs
- **Next.js API Routes** for serverless functions
- **HeyGen Streaming Avatar API** for AI interactions
- **OpenAI Integration** for natural language processing
- **Supabase** for authentication and database (configured)

### AI & Voice
- **HeyGen Interactive Avatar** with real-time streaming
- **ElevenLabs Voice Models** for natural speech
- **Deepgram STT** for speech recognition
- **WebSocket** for real-time communication

### Accessibility & UX
- **WCAG AA+ Compliance** with high contrast and large text options
- **Mobile-First Design** optimized for smartphones and tablets
- **Multi-language Support** (4 languages)
- **Font Size Scaling** for visual accessibility
- **Touch-Friendly Interface** with 44px+ tap targets

### Testing & Quality
- **Playwright** for end-to-end testing
- **TypeScript** for compile-time error checking
- **ESLint** for code quality
- **Responsive Design** testing across devices

### Deployment
- **Vercel** for hosting and deployment
- **PWA Support** for mobile app-like experience
- **Singapore Region** deployment for optimal performance

## 📱 Mobile-First Design

SilverSigma is specifically designed for seniors with accessibility in mind:

- **Large Touch Targets**: Minimum 44px tap areas for easy interaction
- **High Contrast**: WCAG AA+ compliant color schemes
- **Readable Typography**: Large, clear fonts with adjustable text size
- **Simple Navigation**: Intuitive bottom navigation bar
- **Voice-First Options**: Speech recognition and synthesis for easy interaction
- **One-Handed Use**: Optimized for single-hand mobile usage

## 🌍 Internationalization

Full support for 4 languages:
- **English** (🇺🇸) - Primary language
- **Bahasa Melayu** (🇲🇾) - Malaysian language
- **தமிழ்** (🇮🇳) - Tamil language  
- **中文** (🇨🇳) - Chinese language

All UI elements, content, and interactions are fully translated and culturally adapted.

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- npm or yarn
- HeyGen API key (for AI avatar)
- OpenAI API key (for AI processing)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/SilverSigma.git
   cd SilverSigma
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # HeyGen API
   HEYGEN_API_KEY=your_heygen_api_key
   NEXT_PUBLIC_BASE_API_URL=https://api.heygen.com
   
   # OpenAI API
   OPENAI_API_KEY=your_openai_api_key
   
   # Supabase (optional)
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🧪 Testing

### Run Tests
```bash
# Run Playwright E2E tests
npm run test:e2e

# Run tests with UI
npm run test:e2e:ui

# Run tests in headed mode
npm run test:e2e:headed
```

### Test Coverage
- **E2E Tests**: Critical user flows including navigation, AI chat, and hobby exploration
- **Mobile Testing**: Responsive design validation across devices
- **Accessibility Testing**: WCAG compliance verification
- **Cross-browser Testing**: Chrome, Firefox, Safari compatibility

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Set environment variables in Vercel dashboard**
3. **Deploy automatically on push to main**

The application is configured for Singapore region deployment for optimal performance.

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📊 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (marketing)/       # Marketing pages
│   ├── api/               # API routes
│   │   ├── get-access-token/  # HeyGen API integration
│   │   └── health/        # Health check endpoint
│   ├── assistant/         # AI Companion page
│   ├── hobbies/           # Hobby Hub page
│   ├── feed/              # SeniorGram social feed
│   ├── profile/           # User profile page
│   └── community-classes/ # Community workshops
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   ├── AvatarConfig/     # AI avatar configuration
│   ├── AvatarSession/    # Avatar interaction components
│   ├── feed/             # Social feed components
│   ├── hobbies/          # Hobby-related components
│   └── settings/         # User settings components
├── lib/                  # Utilities and helpers
│   ├── i18n/            # Internationalization
│   └── font-size/       # Accessibility controls
├── types/                # TypeScript type definitions
└── public/               # Static assets
```

## 🎯 Key Components

### AI Avatar System
- **InteractiveAvatar**: Main avatar component with voice/text chat
- **AvatarConfig**: Configuration panel for avatar settings
- **AvatarControls**: Chat controls and session management
- **MessageHistory**: Chat history display

### Hobby System
- **HobbyHub**: Main hobby exploration interface
- **CategoryFilter**: Filter hobbies by category
- **StarterGuide**: Detailed hobby setup instructions
- **CommunityClasses**: Workshop booking system

### Social Features
- **SeniorGram**: Social feed with posts and interactions
- **PostCreation**: Create new posts with media
- **CommentSystem**: Interactive commenting system
- **UserProfile**: Personal dashboard and settings

## 🔧 Development

### Code Style
- **ESLint**: Code linting and formatting
- **TypeScript**: Strict type checking
- **Conventional Commits**: Standardized commit messages
- **Component Architecture**: Reusable, accessible components

### Accessibility Guidelines
- **WCAG AA+ Compliance**: All components meet accessibility standards
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Color Contrast**: High contrast ratios for readability

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style and TypeScript patterns
- Write tests for new features
- Ensure accessibility compliance
- Update documentation as needed
- Test across different devices and screen sizes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **HeyGen** for interactive avatar technology
- **OpenAI** for AI capabilities
- **Vercel** for deployment platform
- **shadcn/ui** for beautiful UI components
- **Singapore Community Centers** for workshop inspiration

## 📞 Support

For questions, issues, or contributions:

- **GitHub Issues**: [Create an issue](https://github.com/yourusername/SilverSigma/issues)
- **Documentation**: [View full docs](https://docs.silversigma.com)

---

*Building technology that makes life better for seniors, one feature at a time.*
