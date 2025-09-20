# SilverSigma - Senior Community App

A mobile-first web application designed specifically for seniors in Singapore, featuring AI companionship, hobby exploration, and social connectivity.

## 🌟 Features

### 🤖 AI Companion
- **Voice Chat**: Natural conversation with AI using speech recognition
- **Multi-language Support**: English, Mandarin, and common Singaporean dialects
- **Visual Avatar**: HeyGen streaming avatar with real-time lip-sync
- **Accessibility**: Large text, high contrast, clear audio

### 🎯 Hobby Hub
- **Discover Hobbies**: Learn new activities and skills
- **Find Buddies**: Connect with like-minded people nearby
- **Community Events**: Join local hobby groups and meetups
- **Skill Building**: Step-by-step tutorials and guides

### 📸 SeniorGram
- **Safe Sharing**: Private social feed for family and friends
- **Photo Stories**: Share moments with loved ones
- **Easy Interface**: Simple, intuitive design for all ages
- **Privacy First**: Secure, controlled sharing environment

## ��️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, React
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Next.js API routes, Supabase
- **AI**: OpenAI GPT-4, HeyGen Streaming Avatar
- **Database**: Supabase PostgreSQL with Row Level Security
- **Authentication**: Supabase Auth (Magic Links)
- **Testing**: Playwright, Jest
- **Deployment**: Vercel, PWA support

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- npm or yarn
- Supabase account
- OpenAI API key
- HeyGen API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/SilverSigma.git
   cd SilverSigma/silvercircle
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
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   
   # OpenAI
   OPENAI_API_KEY=your_openai_api_key
   
   # HeyGen
   HEYGEN_API_KEY=your_heygen_api_key
   ```

4. **Set up the database**
   ```bash
   # Run the SQL schema
   psql -h your_db_host -U postgres -d postgres -f database/schema.sql
   
   # Run the seed script
   npm run seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Mobile-First Design

SilverSigma is designed with seniors in mind:

- **Large Touch Targets**: Minimum 44px tap areas
- **High Contrast**: WCAG AA+ compliant color schemes
- **Readable Typography**: Large, clear fonts with adjustable text size
- **Simple Navigation**: Intuitive bottom navigation bar
- **Voice-First**: Speech recognition and synthesis for easy interaction

## 🧪 Testing

### Run Tests
```bash
# Run Playwright tests
npm run test:e2e

# Run unit tests
npm run test

# Run all tests
npm run test:all
```

### Test Coverage
- **E2E Tests**: Critical user flows with Playwright
- **Unit Tests**: Component and utility function testing
- **Accessibility Tests**: WCAG compliance verification

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Set environment variables in Vercel dashboard**
3. **Deploy automatically on push to main**

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📊 Database Schema

### Core Tables
- `profiles` - User profiles and preferences
- `hobbies` - Available hobbies and activities
- `hobby_memberships` - User hobby group memberships
- `posts` - SeniorGram posts and content
- `conversations` - AI chat history
- `buddies` - Hobby buddy connections

### Row Level Security
All tables have RLS policies to ensure data privacy and security.

## 🔧 Development

### Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── (marketing)/       # Marketing pages
│   ├── api/               # API routes
│   ├── assistant/         # AI Companion page
│   ├── hobbies/           # Hobby Hub page
│   ├── feed/              # SeniorGram page
│   └── profile/           # User profile page
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── lib/                  # Utilities and helpers
├── types/                # TypeScript type definitions
└── public/               # Static assets
```

### Code Style
- **ESLint**: Code linting and formatting
- **Prettier**: Consistent code formatting
- **TypeScript**: Strict type checking
- **Conventional Commits**: Standardized commit messages

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Ensure accessibility compliance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Supabase** for backend infrastructure
- **OpenAI** for AI capabilities
- **HeyGen** for avatar technology
- **Vercel** for deployment platform
- **shadcn/ui** for UI components

## 📞 Support

For questions, issues, or contributions:

- **GitHub Issues**: [Create an issue](https://github.com/yourusername/SilverSigma/issues)
- **Email**: support@silversigma.com
- **Documentation**: [View full docs](https://docs.silversigma.com)

---

*Building technology that makes life better, one project at a time.*
