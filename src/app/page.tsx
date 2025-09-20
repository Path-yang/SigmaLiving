"use client";

import { Hero } from '@/components/Hero'
import { FeatureCard } from '@/components/FeatureCard'
import { useI18n } from '@/lib/i18n/context';
import { ResponsiveText } from '@/components/responsive/ResponsiveText';
import { ResponsiveContainer } from '@/components/responsive/ResponsiveContainer';

export default function HomePage() {
  const { t } = useI18n();

  return (
    <div className="space-y-12 md:space-y-16">
      <Hero />
      
      <ResponsiveContainer maxWidth="6xl">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <FeatureCard
            icon="🤖"
            title={t.home.features.ai.title}
            desc={t.home.features.ai.description}
            href="/assistant"
            testId="feature-ai"
            cardNumber={1}
          />
          
          <FeatureCard
            icon="❤️"
            title={t.home.features.hobbies.title}
            desc={t.home.features.hobbies.description}
            href="/hobbies"
            testId="feature-hobbies"
            cardNumber={3}
          />

          <FeatureCard
            icon="📱"
            title={t.home.features.feed.title}
            desc={t.home.features.feed.description}
            href="/feed"
            testId="feature-feed"
            cardNumber={2}
          />
        </section>
      </ResponsiveContainer>
    </div>
  );
}
