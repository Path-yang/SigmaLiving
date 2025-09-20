import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, Heart, MessageCircle, Share, Plus } from 'lucide-react';
import Image from 'next/image';

export default function FeedPage() {
  const posts = [
    {
      id: 1,
      author: 'Margaret Chen',
      time: '2 hours ago',
      content: 'Had a wonderful time at the community garden today! The tomatoes are growing beautifully. 🌱',
      image: '/images/community-garden.jpg',
      likes: 12,
      comments: 3
    },
    {
      id: 2,
      author: 'Robert Lim',
      time: '5 hours ago',
      content: 'Just finished reading "The Art of Simple Living" - highly recommend it to everyone!',
      image: null,
      likes: 8,
      comments: 5
    },
    {
      id: 3,
      author: 'Sarah Wong',
      time: '1 day ago',
      content: 'Our mahjong group had such a fun evening yesterday. Can\'t wait for next week! 🀄',
      image: '/images/mahjong.jpeg',
      likes: 15,
      comments: 7
    }
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
          SeniorGram
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Share your moments and stay connected with family and friends in a safe, friendly environment.
        </p>
      </div>

      {/* Create Post */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900">Share Something</CardTitle>
          <CardDescription className="text-lg text-gray-600">
            What's on your mind today?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <textarea
              placeholder="Share your thoughts, photos, or updates..."
              className="w-full p-4 border border-gray-300 rounded-lg text-lg resize-none"
              rows={4}
            />
            <div className="flex gap-4">
              <Button variant="outline" className="flex-1">
                <Camera className="w-5 h-5 mr-2" />
                Add Photo
              </Button>
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-5 h-5 mr-2" />
                Post Update
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posts Feed */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Recent Posts</h2>
        
        {posts.map((post) => (
          <Card key={post.id} className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{post.author}</h3>
                  <p className="text-sm text-gray-500">{post.time}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <Share className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-800 mb-4">{post.content}</p>
              
              {post.image && (
                <div className="mb-4">
                  <div className="w-full h-64 relative rounded-lg overflow-hidden">
                    <Image
                      src={post.image}
                      alt={`Post by ${post.author}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
              
              <div className="flex items-center gap-6">
                <Button variant="ghost" className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  {post.likes} Likes
                </Button>
                <Button variant="ghost" className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  {post.comments} Comments
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Tips */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-4">Sharing Tips</h3>
          <ul className="text-green-800 space-y-2 text-lg">
            <li>• Share photos of your hobbies and activities</li>
            <li>• Post updates about your day or achievements</li>
            <li>• Ask questions to get advice from the community</li>
            <li>• Like and comment on posts to show support</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
