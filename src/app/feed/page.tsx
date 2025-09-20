"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, Heart, MessageCircle, Share, Plus, MoreHorizontal, Smile, MapPin, Tag } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faComment,
  faShare,
  faEllipsisH,
  faCamera,
  faImage,
  faVideo,
  faSmile,
  faMapMarkerAlt,
  faTag,
  faThumbsUp,
  faBookmark,
  faFlag,
  faUserCircle,
  faGlobe,
  faClock,
  faEdit,
  faTrash,
  faReply
} from '@fortawesome/free-solid-svg-icons';
// Using only solid icons - will style differently for unliked/unbookmarked states
import Image from 'next/image';
import { useState } from 'react';

export default function FeedPage() {
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<number>>(new Set());
  const [showComments, setShowComments] = useState<Set<number>>(new Set());

  const posts = [
    {
      id: 1,
      author: 'Margaret Chen',
      authorAvatar: '/images/margaret (1).jpg', // Margaret's profile picture
      time: '2 hours ago',
      content: 'Had a wonderful time at the community garden today! The tomatoes are growing beautifully. 🌱',
      image: '/images/community-garden.jpg',
      likes: 12,
      comments: 3,
      shares: 2,
      location: 'Community Garden, Toa Payoh',
      isLiked: false,
      isBookmarked: false
    },
    {
      id: 2,
      author: 'Robert Lim',
      authorAvatar: '/images/robert (1).jpg', // Robert's profile picture
      time: '5 hours ago',
      content: 'Just finished reading "The Art of Simple Living" - highly recommend it to everyone! 📚',
      image: null,
      likes: 8,
      comments: 5,
      shares: 1,
      location: null,
      isLiked: false,
      isBookmarked: false
    },
    {
      id: 3,
      author: 'Sarah Wong',
      authorAvatar: '/images/sarah (1).jpg', // Sarah's profile picture
      time: '1 day ago',
      content: 'Our mahjong group had such a fun evening yesterday. Can\'t wait for next week! 🀄',
      image: '/images/mahjong.jpeg',
      likes: 15,
      comments: 7,
      shares: 3,
      location: 'Community Centre',
      isLiked: false,
      isBookmarked: false
    }
  ];

  const handleLike = (postId: number) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleBookmark = (postId: number) => {
    setBookmarkedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const toggleComments = (postId: number) => {
    setShowComments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

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
      <Card className="shadow-lg border-0 bg-white">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faUserCircle} className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <textarea
                placeholder="What's on your mind?"
                className="w-full p-3 border-0 text-lg resize-none focus:outline-none placeholder-gray-500"
                rows={3}
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-6">
              <Button variant="ghost" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50">
                <FontAwesomeIcon icon={faImage} className="w-5 h-5" />
                <span>Photo</span>
              </Button>
              <Button variant="ghost" className="flex items-center space-x-2 text-gray-600 hover:text-green-600 hover:bg-green-50">
                <FontAwesomeIcon icon={faVideo} className="w-5 h-5" />
                <span>Video</span>
              </Button>
              <Button variant="ghost" className="flex items-center space-x-2 text-gray-600 hover:text-yellow-600 hover:bg-yellow-50">
                <FontAwesomeIcon icon={faSmile} className="w-5 h-5" />
                <span>Feeling</span>
              </Button>
              <Button variant="ghost" className="flex items-center space-x-2 text-gray-600 hover:text-red-600 hover:bg-red-50">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="w-5 h-5" />
                <span>Location</span>
              </Button>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full">
              <FontAwesomeIcon icon={faEdit} className="w-4 h-4 mr-2" />
              Post
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <Card key={post.id} className="shadow-lg border-0 bg-white">
            {/* Post Header */}
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    {post.authorAvatar ? (
                      <Image
                        src={post.authorAvatar}
                        alt={post.author}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <FontAwesomeIcon icon={faUserCircle} className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{post.author}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <FontAwesomeIcon icon={faClock} className="w-3 h-3" />
                      <span>{post.time}</span>
                      {post.location && (
                        <>
                          <span>•</span>
                          <FontAwesomeIcon icon={faMapMarkerAlt} className="w-3 h-3" />
                          <span>{post.location}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                  <FontAwesomeIcon icon={faEllipsisH} className="w-4 h-4" />
                </Button>
              </div>

              {/* Post Content */}
              <p className="text-gray-800 mb-4 leading-relaxed">{post.content}</p>

              {/* Post Image */}
              {post.image && (
                <div className="mb-4">
                  <div className="w-full max-h-96 relative rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                    <Image
                      src={post.image}
                      alt={`Post by ${post.author}`}
                      width={800}
                      height={600}
                      className="max-w-full max-h-full object-contain rounded-lg"
                    />
                  </div>
                </div>
              )}

              {/* Post Stats */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <div className="flex items-center space-x-4">
                  <span>{post.likes} likes</span>
                  <span>{post.comments} comments</span>
                  <span>{post.shares} shares</span>
                </div>
              </div>

              {/* Post Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center space-x-8">
                  <Button
                    variant="ghost"
                    className={`flex items-center space-x-2 ${likedPosts.has(post.id)
                      ? 'text-red-600 hover:text-red-700'
                      : 'text-gray-600 hover:text-red-600'
                      }`}
                    onClick={() => handleLike(post.id)}
                  >
                    <FontAwesomeIcon
                      icon={faHeart}
                      className={`w-5 h-5 ${likedPosts.has(post.id) ? 'text-red-600' : 'text-gray-400'}`}
                    />
                    <span>Like</span>
                  </Button>

                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
                    onClick={() => toggleComments(post.id)}
                  >
                    <FontAwesomeIcon icon={faComment} className="w-5 h-5" />
                    <span>Comment</span>
                  </Button>

                  <Button variant="ghost" className="flex items-center space-x-2 text-gray-600 hover:text-green-600">
                    <FontAwesomeIcon icon={faShare} className="w-5 h-5" />
                    <span>Share</span>
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  className={`${bookmarkedPosts.has(post.id)
                    ? 'text-blue-600 hover:text-blue-700'
                    : 'text-gray-600 hover:text-blue-600'
                    }`}
                  onClick={() => handleBookmark(post.id)}
                >
                  <FontAwesomeIcon
                    icon={faBookmark}
                    className={`w-5 h-5 ${bookmarkedPosts.has(post.id) ? 'text-blue-600' : 'text-gray-400'}`}
                  />
                </Button>
              </div>

              {/* Comments Section */}
              {showComments.has(post.id) && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                        <FontAwesomeIcon icon={faUserCircle} className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-sm text-gray-800">Great post! Thanks for sharing 🌱</p>
                        </div>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <button className="hover:text-blue-600">Like</button>
                          <button className="hover:text-blue-600">Reply</button>
                          <span>2h</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                        <FontAwesomeIcon icon={faUserCircle} className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Write a comment..."
                          className="w-full p-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Tips */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <FontAwesomeIcon icon={faGlobe} className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Community Guidelines</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <FontAwesomeIcon icon={faImage} className="w-5 h-5 text-green-600 mt-1" />
              <div>
                <h4 className="font-medium text-gray-900">Share Your Moments</h4>
                <p className="text-sm text-gray-600">Post photos of your hobbies and daily activities</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FontAwesomeIcon icon={faHeart} className="w-5 h-5 text-red-600 mt-1" />
              <div>
                <h4 className="font-medium text-gray-900">Show Support</h4>
                <p className="text-sm text-gray-600">Like and comment to encourage others</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FontAwesomeIcon icon={faComment} className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <h4 className="font-medium text-gray-900">Ask Questions</h4>
                <p className="text-sm text-gray-600">Get advice and connect with the community</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FontAwesomeIcon icon={faSmile} className="w-5 h-5 text-yellow-600 mt-1" />
              <div>
                <h4 className="font-medium text-gray-900">Stay Positive</h4>
                <p className="text-sm text-gray-600">Share updates about your achievements</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
