#!/bin/bash

echo "�� Setting up SilverCircle..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create environment file if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating environment file..."
    cp .env.local.example .env.local
    echo "⚠️  Please update .env.local with your Supabase and OpenAI credentials"
fi

# Generate icons
echo "🎨 Generating icons..."
node generate-icons.js

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your credentials"
echo "2. Set up your Supabase database (see README.md)"
echo "3. Run: npm run dev"
echo "4. Open http://localhost:3000"
