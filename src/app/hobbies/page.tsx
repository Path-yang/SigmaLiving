"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, BookOpen, Camera, Music, Utensils, Palette } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

export default function HobbiesPage() {
  const { t } = useI18n();

  const hobbyCategories = [
    {
      icon: Heart,
      title: 'Gardening',
      description: 'Learn about plants, flowers, and sustainable gardening practices.',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      icon: BookOpen,
      title: 'Reading',
      description: 'Discover new books and join reading groups in your community.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      icon: Camera,
      title: 'Photography',
      description: 'Capture beautiful moments and learn photography techniques.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      icon: Music,
      title: 'Music',
      description: 'Learn to play instruments or enjoy listening to music together.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      icon: Utensils,
      title: 'Cooking',
      description: 'Share recipes and learn new cooking techniques from others.',
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      icon: Palette,
      title: 'Art & Crafts',
      description: 'Express your creativity through painting, drawing, and crafts.',
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
    },
  ];

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {t.hobbies.title}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t.hobbies.subtitle}
        </p>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {hobbyCategories.map((hobby, index) => {
          const Icon = hobby.icon;
          return (
            <Card key={index} className="enhanced-card hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 ${hobby.bgColor} rounded-full flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${hobby.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {hobby.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {hobby.description}
                </p>
                <Button className="w-full enhanced-button">
                  <span className="text-sm font-medium">
                    Explore
                  </span>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
