export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          display_name: string | null
          year_of_birth: number | null
          dialects: string[] | null
          languages: string[] | null
          bio: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          display_name?: string | null
          year_of_birth?: number | null
          dialects?: string[] | null
          languages?: string[] | null
          bio?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          display_name?: string | null
          year_of_birth?: number | null
          dialects?: string[] | null
          languages?: string[] | null
          bio?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      hobbies: {
        Row: {
          id: number
          name: string
          category: string
          icon: string
        }
        Insert: {
          id?: number
          name: string
          category: string
          icon: string
        }
        Update: {
          id?: number
          name?: string
          category?: string
          icon?: string
        }
      }
      user_hobbies: {
        Row: {
          user_id: string
          hobby_id: number
        }
        Insert: {
          user_id: string
          hobby_id: number
        }
        Update: {
          user_id?: string
          hobby_id?: number
        }
      }
      tutorials: {
        Row: {
          id: number
          hobby_id: number
          title: string
          kind: 'video' | 'article' | 'workshop'
          url: string
          duration_mins: number
          difficulty: 'beginner' | 'intermediate' | 'advanced'
          is_offline: boolean
          description: string | null
        }
        Insert: {
          id?: number
          hobby_id: number
          title: string
          kind: 'video' | 'article' | 'workshop'
          url: string
          duration_mins: number
          difficulty: 'beginner' | 'intermediate' | 'advanced'
          is_offline?: boolean
          description?: string | null
        }
        Update: {
          id?: number
          hobby_id?: number
          title?: string
          kind?: 'video' | 'article' | 'workshop'
          url?: string
          duration_mins?: number
          difficulty?: 'beginner' | 'intermediate' | 'advanced'
          is_offline?: boolean
          description?: string | null
        }
      }
      posts: {
        Row: {
          id: number
          user_id: string
          caption: string
          media_url: string | null
          created_at: string
        }
        Insert: {
          id?: number
          user_id: string
          caption: string
          media_url?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          caption?: string
          media_url?: string | null
          created_at?: string
        }
      }
      comments: {
        Row: {
          id: number
          post_id: number
          user_id: string
          content: string
          created_at: string
        }
        Insert: {
          id?: number
          post_id: number
          user_id: string
          content: string
          created_at?: string
        }
        Update: {
          id?: number
          post_id?: number
          user_id?: string
          content?: string
          created_at?: string
        }
      }
      likes: {
        Row: {
          user_id: string
          post_id: number
        }
        Insert: {
          user_id: string
          post_id: number
        }
        Update: {
          user_id?: string
          post_id?: number
        }
      }
      follows: {
        Row: {
          follower: string
          followee: string
        }
        Insert: {
          follower: string
          followee: string
        }
        Update: {
          follower?: string
          followee?: string
        }
      }
    }
  }
}
