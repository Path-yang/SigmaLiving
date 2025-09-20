"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Settings, Heart, Camera, MessageSquare, Calendar } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import { ResponsiveText } from '@/components/responsive/ResponsiveText';
import { ResponsiveContainer } from '@/components/responsive/ResponsiveContainer';
import { FontSizeSelector } from '@/components/settings/FontSizeSelector';
import { LanguageSelector } from '@/components/settings/LanguageSelector';

export default function ProfilePage() {
  const { t } = useI18n();
  
  const userStats = {
    posts: 24,
    hobbies: 3,
    friends: 12,
    joined: 'March 2024'
  };

  const recentActivity = [
    { action: 'Posted a photo', time: '2 hours ago', icon: Camera },
    { action: 'Joined Gardening group', time: '1 day ago', icon: Heart },
    { action: 'Commented on a post', time: '2 days ago', icon: MessageSquare },
    { action: 'Attended Tai Chi class', time: '3 days ago', icon: Calendar }
  ];

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Page Header */}
      <div className="text-center">
        <ResponsiveText as="h1" size="3xl" weight="bold" className="text-gray-900 mb-4">
          {t.profile.title}
        </ResponsiveText>
        <ResponsiveText as="p" size="lg" className="text-gray-600 max-w-2xl mx-auto">
          {t.profile.subtitle}
        </ResponsiveText>
      </div>

      {/* Profile Header */}
      <Card className="shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 md:w-12 md:h-12 text-blue-600" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <ResponsiveText as="h2" size="2xl" weight="bold" className="text-gray-900 mb-2">
                John Smith
              </ResponsiveText>
              <ResponsiveText as="p" size="base" className="text-gray-600 mb-4">
                Member since {userStats.joined}
              </ResponsiveText>
              <ResponsiveText as="p" size="sm" className="text-gray-700">
                I love gardening, reading, and spending time with my family. 
                Always happy to meet new people and learn new things!
              </ResponsiveText>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Settings className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              {t.profile.editProfile}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <Card className="text-center">
          <CardContent className="p-4 md:p-6">
            <Camera className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-blue-600" />
            <ResponsiveText as="div" size="2xl" weight="bold" className="text-gray-900">
              {userStats.posts}
            </ResponsiveText>
            <ResponsiveText as="div" size="sm" className="text-gray-600">
              {t.profile.stats.posts}
            </ResponsiveText>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4 md:p-6">
            <Heart className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-green-600" />
            <ResponsiveText as="div" size="2xl" weight="bold" className="text-gray-900">
              {userStats.hobbies}
            </ResponsiveText>
            <ResponsiveText as="div" size="sm" className="text-gray-600">
              {t.profile.stats.hobbies}
            </ResponsiveText>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4 md:p-6">
            <User className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-purple-600" />
            <ResponsiveText as="div" size="2xl" weight="bold" className="text-gray-900">
              {userStats.friends}
            </ResponsiveText>
            <ResponsiveText as="div" size="sm" className="text-gray-600">
              {t.profile.stats.friends}
            </ResponsiveText>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4 md:p-6">
            <Calendar className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-orange-600" />
            <ResponsiveText as="div" size="2xl" weight="bold" className="text-gray-900">
              12
            </ResponsiveText>
            <ResponsiveText as="div" size="sm" className="text-gray-600">
              {t.profile.stats.events}
            </ResponsiveText>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl font-bold text-gray-900">
            {t.profile.recentActivity.title}
          </CardTitle>
          <CardDescription className="text-base md:text-lg text-gray-600">
            {t.profile.recentActivity.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 md:space-y-4">
            {recentActivity.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Icon className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <ResponsiveText as="p" size="base" weight="medium" className="text-gray-900">
                      {activity.action}
                    </ResponsiveText>
                    <ResponsiveText as="p" size="sm" className="text-gray-500">
                      {activity.time}
                    </ResponsiveText>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl font-bold text-gray-900">
            {t.profile.settings.title}
          </CardTitle>
          <CardDescription className="text-base md:text-lg text-gray-600">
            {t.profile.settings.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Font Size Settings */}
          <FontSizeSelector />
          
          {/* Language Settings */}
          <LanguageSelector />
          
          {/* Other Settings */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <ResponsiveText as="h3" size="base" weight="semibold" className="text-gray-900">
                  {t.profile.settings.notifications}
                </ResponsiveText>
                <ResponsiveText as="p" size="sm" className="text-gray-600">
                  Get notified about new posts and activities
                </ResponsiveText>
              </div>
              <Button variant="outline">{t.profile.settings.manage}</Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <ResponsiveText as="h3" size="base" weight="semibold" className="text-gray-900">
                  {t.profile.settings.privacy}
                </ResponsiveText>
                <ResponsiveText as="p" size="sm" className="text-gray-600">
                  Control who can see your posts and profile
                </ResponsiveText>
              </div>
              <Button variant="outline">{t.profile.settings.manage}</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
