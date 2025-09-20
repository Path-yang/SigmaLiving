-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  display_name TEXT,
  year_of_birth INTEGER,
  dialects TEXT[],
  languages TEXT[],
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create hobbies table
CREATE TABLE hobbies (
  id BIGSERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  icon TEXT NOT NULL
);

-- Create user_hobbies junction table
CREATE TABLE user_hobbies (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  hobby_id BIGINT REFERENCES hobbies(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, hobby_id)
);

-- Create tutorials table
CREATE TABLE tutorials (
  id BIGSERIAL PRIMARY KEY,
  hobby_id BIGINT REFERENCES hobbies(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  kind TEXT CHECK (kind IN ('video', 'article', 'workshop')) NOT NULL,
  url TEXT NOT NULL,
  duration_mins INTEGER NOT NULL,
  difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')) NOT NULL,
  is_offline BOOLEAN DEFAULT FALSE,
  description TEXT
);

-- Create posts table
CREATE TABLE posts (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  caption TEXT NOT NULL,
  media_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create comments table
CREATE TABLE comments (
  id BIGSERIAL PRIMARY KEY,
  post_id BIGINT REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create likes table
CREATE TABLE likes (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  post_id BIGINT REFERENCES posts(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, post_id)
);

-- Create follows table
CREATE TABLE follows (
  follower UUID REFERENCES profiles(id) ON DELETE CASCADE,
  followee UUID REFERENCES profiles(id) ON DELETE CASCADE,
  PRIMARY KEY (follower, followee)
);

-- Create indexes for better performance
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_likes_post_id ON likes(post_id);
CREATE INDEX idx_follows_follower ON follows(follower);
CREATE INDEX idx_follows_followee ON follows(followee);
CREATE INDEX idx_user_hobbies_user_id ON user_hobbies(user_id);
CREATE INDEX idx_tutorials_hobby_id ON tutorials(hobby_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
