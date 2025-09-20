"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share, Plus } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import { ResponsiveText } from '@/components/responsive/ResponsiveText';
import { ResponsiveContainer } from '@/components/responsive/ResponsiveContainer';

export default function FeedPage() {
  const { t } = useI18n();

  const samplePosts = [
    {
      id: 1,
      author: 'Sarah Chen',
      time: '2 hours ago',
      content: 'Just finished my morning gardening session! The roses are blooming beautifully this season.',
      image: '/placeholder-garden.jpg',
      likes: 12,
      comments: 3,
    },
    {
      id: 2,
      author: 'Robert Lim',
      time: '4 hours ago',
      content: 'Sharing my latest watercolor painting. Art has become such a wonderful hobby in my retirement.',
      image: '/placeholder-art.jpg',
      likes: 8,
      comments: 5,
    },
    {
      id: 3,
      author: 'Mary Tan',
      time: '1 day ago',
      content: 'Cooking class was amazing today! Learned to make traditional Peranakan dishes.',
      image: '/placeholder-cooking.jpg',
      likes: 15,
      comments: 7,
    },
  ];

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Page Header */}
      <div className="text-center">
        <ResponsiveText as="h1" size="3xl" weight="bold" className="text-gray-900 mb-4">
          {t.feed.title}
        </ResponsiveText>
        <ResponsiveText as="p" size="lg" className="text-gray-600 max-w-2xl mx-auto">
          {t.feed.subtitle}
        </ResponsiveText>
      </div>

      {/* Create Post Button */}
      <ResponsiveContainer maxWidth="4xl">
        <Card className="enhanced-card">
          <CardContent className="p-4">
            <Button className="w-full enhanced-button bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              <ResponsiveText size="sm" weight="medium">
                {t.feed.post}
              </ResponsiveText>
            </Button>
          </CardContent>
        </Card>
      </ResponsiveContainer>

      {/* Posts Feed */}
      <ResponsiveContainer maxWidth="4xl">
        <div className="space-y-4 md:space-y-6">
          {samplePosts.map((post) => (
            <Card key={post.id} className="enhanced-card">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">
                        {post.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <ResponsiveText as="h3" size="base" weight="semibold" className="text-gray-900">
                        {post.author}
                      </ResponsiveText>
                      <ResponsiveText as="p" size="sm" className="text-gray-500">
                        {post.time}
                      </ResponsiveText>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <ResponsiveText as="p" size="base" className="text-gray-700 mb-4">
                  {post.content}
                </ResponsiveText>
                
                {post.image && (
                  <div className="mb-4 rounded-lg overflow-hidden bg-gray-100 h-48 flex items-center justify-center">
                    <ResponsiveText size="sm" className="text-gray-500">
                      Image placeholder
                    </ResponsiveText>
                  </div>
                )}
                
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    <ResponsiveText size="sm">
                      {t.feed.like} ({post.likes})
                    </ResponsiveText>
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    <ResponsiveText size="sm">
                      {t.feed.comment} ({post.comments})
                    </ResponsiveText>
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <Share className="w-4 h-4" />
                    <ResponsiveText size="sm">
                      {t.feed.share}
                    </ResponsiveText>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ResponsiveContainer>
    </div>
  );
}
