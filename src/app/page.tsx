import { Hero } from '@/components/Hero'
import { FeatureCard } from '@/components/FeatureCard'

export default function HomePage() {
  return (
    <div className="space-y-16">
      <Hero />
      
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard
          icon="🤖"
          title="Talk to AI"
          desc="Have meaningful conversations with our friendly AI companion using voice or text. Get help, advice, or just chat whenever you need someone to talk to."
          href="/assistant"
          testId="feature-ai"
          cardNumber={1}
        />
        
        <FeatureCard
          icon="❤️"
          title="Learn Hobbies"
          desc="Discover new hobbies and activities to keep you engaged and active. From gardening tips to cooking recipes, explore what interests you most."
          href="/hobbies"
          testId="feature-hobbies"
          cardNumber={3}
        />

        <FeatureCard
          icon="📱"
          title="Share Moments"
          desc="Share photos and updates with your family and friends easily. Stay connected with your loved ones and never miss important moments."
          href="/feed"
          testId="feature-feed"
          cardNumber={2}
        />
      </section>
    </div>
  );
}
