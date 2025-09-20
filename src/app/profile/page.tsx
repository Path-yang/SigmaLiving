"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Settings, Heart, Camera, MessageSquare, Calendar } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
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
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
          {t.profile.title}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {t.profile.subtitle}
        </p>
      </div>

      {/* Profile Header */}
      <Card className="shadow-lg">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-blue-600" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">John Smith</h2>
              <p className="text-lg text-gray-600 mb-4">Member since {userStats.joined}</p>
              <p className="text-gray-700">
                I love gardening, reading, and spending time with my family. 
                Always happy to meet new people and learn new things!
              </p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Settings className="w-5 h-5 mr-2" />
              {t.profile.editProfile}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="p-6">
            <Camera className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold text-gray-900">{userStats.posts}</div>
            <div className="text-sm text-gray-600">{t.profile.stats.posts}</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-6">
            <Heart className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold text-gray-900">{userStats.hobbies}</div>
            <div className="text-sm text-gray-600">{t.profile.stats.hobbies}</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-6">
            <User className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <div className="text-2xl font-bold text-gray-900">{userStats.friends}</div>
            <div className="text-sm text-gray-600">{t.profile.stats.friends}</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-6">
            <Calendar className="w-8 h-8 mx-auto mb-2 text-orange-600" />
            <div className="text-2xl font-bold text-gray-900">12</div>
            <div className="text-sm text-gray-600">{t.profile.stats.events}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900">{t.profile.recentActivity.title}</CardTitle>
          <CardDescription className="text-lg text-gray-600">
            {t.profile.recentActivity.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
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
          <CardTitle className="text-2xl font-bold text-gray-900">{t.profile.settings.title}</CardTitle>
          <CardDescription className="text-lg text-gray-600">
            {t.profile.settings.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Font Size Settings */}
          <div className="border border-gray-200 rounded-lg p-6">
            <FontSizeSelector />
          </div>
          
          {/* Language Settings */}
          <div className="border border-gray-200 rounded-lg p-6">
            <LanguageSelector />
          </div>
          
          {/* Other Settings */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{t.profile.settings.notifications}</h3>
                <p className="text-gray-600">Get notified about new posts and activities</p>
              </div>
              <Button variant="outline">{t.profile.settings.manage}</Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{t.profile.settings.privacy}</h3>
                <p className="text-gray-600">Control who can see your posts and profile</p>
              </div>
              <Button variant="outline">{t.profile.settings.manage}</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
