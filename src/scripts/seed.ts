import { createServiceClient } from '@/lib/supabase/server'

const hobbies = [
  // Arts & Crafts
  { name: 'Calligraphy', category: 'Arts & Crafts', icon: '✍️' },
  { name: 'Painting', category: 'Arts & Crafts', icon: '🎨' },
  { name: 'Pottery', category: 'Arts & Crafts', icon: '🏺' },
  { name: 'Origami', category: 'Arts & Crafts', icon: '📄' },
  { name: 'Knitting', category: 'Arts & Crafts', icon: '🧶' },
  { name: 'Photography', category: 'Arts & Crafts', icon: '📸' },

  // Fitness & Health
  { name: 'Tai Chi', category: 'Fitness & Health', icon: '🧘' },
  { name: 'Walking', category: 'Fitness & Health', icon: '🚶' },
  { name: 'Swimming', category: 'Fitness & Health', icon: '🏊' },
  { name: 'Yoga', category: 'Fitness & Health', icon: '🧘‍♀️' },
  { name: 'Gardening', category: 'Fitness & Health', icon: '🌱' },

  // Games & Entertainment
  { name: 'Mahjong', category: 'Games & Entertainment', icon: '🀄' },
  { name: 'Chess', category: 'Games & Entertainment', icon: '♟️' },
  { name: 'Board Games', category: 'Games & Entertainment', icon: '🎲' },
  { name: 'Karaoke', category: 'Games & Entertainment', icon: '🎤' },
  { name: 'Dancing', category: 'Games & Entertainment', icon: '💃' },

  // Music & Culture
  { name: 'Singing', category: 'Music & Culture', icon: '🎵' },
  { name: 'Piano', category: 'Music & Culture', icon: '🎹' },
  { name: 'Guzheng', category: 'Music & Culture', icon: '🎼' },
  { name: 'Chinese Opera', category: 'Music & Culture', icon: '🎭' },

  // Cooking & Food
  { name: 'Cooking', category: 'Cooking & Food', icon: '👨‍🍳' },
  { name: 'Baking', category: 'Cooking & Food', icon: '🧁' },
  { name: 'Tea Ceremony', category: 'Cooking & Food', icon: '🍵' },

  // Technology
  { name: 'Smartphone Apps', category: 'Technology', icon: '📱' },
  { name: 'Video Calls', category: 'Technology', icon: '📹' },
  { name: 'Online Shopping', category: 'Technology', icon: '🛒' }
]

const tutorials = [
  // Calligraphy tutorials
  { hobby: 'Calligraphy', title: 'Basic Chinese Calligraphy Strokes', kind: 'video' as const, url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration_mins: 15, difficulty: 'beginner' as const, description: 'Learn the fundamental strokes of Chinese calligraphy' },
  { hobby: 'Calligraphy', title: 'Choosing the Right Brush', kind: 'article' as const, url: '/tutorials/calligraphy-brush-guide', duration_mins: 10, difficulty: 'beginner' as const, description: 'A comprehensive guide to selecting calligraphy brushes' },
  
  // Tai Chi tutorials
  { hobby: 'Tai Chi', title: 'Tai Chi for Beginners - 8 Form', kind: 'video' as const, url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration_mins: 30, difficulty: 'beginner' as const, description: 'Learn the basic 8-form Tai Chi sequence' },
  { hobby: 'Tai Chi', title: 'Tai Chi Breathing Techniques', kind: 'article' as const, url: '/tutorials/tai-chi-breathing', duration_mins: 20, difficulty: 'intermediate' as const, description: 'Master proper breathing for Tai Chi practice' },
  
  // Mahjong tutorials
  { hobby: 'Mahjong', title: 'Mahjong Rules and Basic Strategy', kind: 'video' as const, url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration_mins: 45, difficulty: 'beginner' as const, description: 'Complete guide to playing Mahjong' },
  { hobby: 'Mahjong', title: 'Mahjong Tile Recognition', kind: 'article' as const, url: '/tutorials/mahjong-tiles', duration_mins: 25, difficulty: 'beginner' as const, description: 'Learn to identify different Mahjong tiles' },
  
  // Cooking tutorials
  { hobby: 'Cooking', title: 'Traditional Singapore Recipes', kind: 'video' as const, url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration_mins: 60, difficulty: 'intermediate' as const, description: 'Learn to cook classic Singapore dishes' },
  { hobby: 'Cooking', title: 'Healthy Cooking for Seniors', kind: 'article' as const, url: '/tutorials/healthy-cooking', duration_mins: 30, difficulty: 'beginner' as const, description: 'Nutrition tips and healthy cooking methods' },
  
  // Gardening tutorials
  { hobby: 'Gardening', title: 'Container Gardening Basics', kind: 'video' as const, url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration_mins: 25, difficulty: 'beginner' as const, description: 'Start your own container garden' },
  { hobby: 'Gardening', title: 'Growing Herbs at Home', kind: 'article' as const, url: '/tutorials/herb-gardening', duration_mins: 20, difficulty: 'beginner' as const, description: 'Easy herbs to grow in small spaces' },
  
  // Photography tutorials
  { hobby: 'Photography', title: 'Smartphone Photography Tips', kind: 'video' as const, url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration_mins: 20, difficulty: 'beginner' as const, description: 'Take better photos with your phone' },
  { hobby: 'Photography', title: 'Composition Techniques', kind: 'article' as const, url: '/tutorials/photography-composition', duration_mins: 15, difficulty: 'intermediate' as const, description: 'Learn basic photography composition rules' }
]

const sampleProfiles = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    display_name: 'Ah Ma Lim',
    year_of_birth: 1955,
    dialects: ['Hokkien', 'Teochew'],
    languages: ['English', 'Mandarin'],
    bio: 'Love cooking and sharing recipes with friends. Always happy to help others learn new things!',
    avatar_url: null
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    display_name: 'Uncle Tan',
    year_of_birth: 1948,
    dialects: ['Cantonese', 'Hokkien'],
    languages: ['English', 'Mandarin'],
    bio: 'Retired teacher who enjoys Tai Chi and calligraphy. Looking for friends to practice with.',
    avatar_url: null
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    display_name: 'Auntie Mary',
    year_of_birth: 1960,
    dialects: ['English'],
    languages: ['English', 'Malay'],
    bio: 'Passionate about gardening and photography. Love meeting new people and sharing experiences.',
    avatar_url: null
  },
  {
    id: '44444444-4444-4444-4444-444444444444',
    display_name: 'Mr. Wong',
    year_of_birth: 1952,
    dialects: ['Cantonese'],
    languages: ['English', 'Mandarin', 'Cantonese'],
    bio: 'Mahjong enthusiast and cooking lover. Always up for a friendly game and good food!',
    avatar_url: null
  },
  {
    id: '55555555-5555-5555-5555-555555555555',
    display_name: 'Madam Lee',
    year_of_birth: 1958,
    dialects: ['Hokkien', 'Teochew'],
    languages: ['English', 'Mandarin'],
    bio: 'Enjoy knitting and arts & crafts. Love teaching others and learning new skills.',
    avatar_url: null
  }
]

const samplePosts = [
  {
    user_id: '11111111-1111-1111-1111-111111111111',
    caption: 'Made some delicious char kway teow today! Who wants the recipe? 😊',
    media_url: null
  },
  {
    user_id: '22222222-2222-2222-2222-222222222222',
    caption: 'Beautiful morning Tai Chi session at the park. The weather was perfect!',
    media_url: null
  },
  {
    user_id: '33333333-3333-3333-3333-333333333333',
    caption: 'My garden is blooming! Look at these beautiful flowers 🌸',
    media_url: null
  },
  {
    user_id: '44444444-4444-4444-4444-444444444444',
    caption: 'Had a great Mahjong session with friends yesterday. Won three games! 🀄',
    media_url: null
  },
  {
    user_id: '55555555-5555-5555-5555-555555555555',
    caption: 'Finished knitting this beautiful scarf. Perfect for the cooler weather!',
    media_url: null
  }
]

export async function seedDatabase() {
  const supabase = await createServiceClient()

  console.log('🌱 Starting database seed...')

  try {
    // Insert hobbies
    console.log('📝 Inserting hobbies...')
    const { error: hobbiesError } = await supabase
      .from('hobbies')
      .upsert(hobbies, { onConflict: 'name' })

    if (hobbiesError) {
      console.error('Error inserting hobbies:', hobbiesError)
      return
    }

    // Get hobby IDs for tutorials
    const { data: insertedHobbies } = await supabase
      .from('hobbies')
      .select('id, name')

    const hobbyMap = new Map(insertedHobbies?.map(h => [h.name, h.id]) || [])

    // Insert tutorials
    console.log('📚 Inserting tutorials...')
    const tutorialsWithHobbyIds = tutorials.map(tutorial => ({
      ...tutorial,
      hobby_id: hobbyMap.get(tutorial.hobby)!
    }))

    const { error: tutorialsError } = await supabase
      .from('tutorials')
      .upsert(tutorialsWithHobbyIds)

    if (tutorialsError) {
      console.error('Error inserting tutorials:', tutorialsError)
      return
    }

    // Insert sample profiles
    console.log('👥 Inserting sample profiles...')
    const { error: profilesError } = await supabase
      .from('profiles')
      .upsert(sampleProfiles)

    if (profilesError) {
      console.error('Error inserting profiles:', profilesError)
      return
    }

    // Insert sample posts
    console.log('📄 Inserting sample posts...')
    const { error: postsError } = await supabase
      .from('posts')
      .upsert(samplePosts)

    if (postsError) {
      console.error('Error inserting posts:', postsError)
      return
    }

    // Insert user hobbies for sample profiles
    console.log('🎯 Inserting user hobbies...')
    const userHobbies = [
      // Ah Ma Lim - cooking, gardening
      { user_id: '11111111-1111-1111-1111-111111111111', hobby_id: hobbyMap.get('Cooking')! },
      { user_id: '11111111-1111-1111-1111-111111111111', hobby_id: hobbyMap.get('Gardening')! },
      
      // Uncle Tan - tai chi, calligraphy
      { user_id: '22222222-2222-2222-2222-222222222222', hobby_id: hobbyMap.get('Tai Chi')! },
      { user_id: '22222222-2222-2222-2222-222222222222', hobby_id: hobbyMap.get('Calligraphy')! },
      
      // Auntie Mary - gardening, photography
      { user_id: '33333333-3333-3333-3333-333333333333', hobby_id: hobbyMap.get('Gardening')! },
      { user_id: '33333333-3333-3333-3333-333333333333', hobby_id: hobbyMap.get('Photography')! },
      
      // Mr. Wong - mahjong, cooking
      { user_id: '44444444-4444-4444-4444-444444444444', hobby_id: hobbyMap.get('Mahjong')! },
      { user_id: '44444444-4444-4444-4444-444444444444', hobby_id: hobbyMap.get('Cooking')! },
      
      // Madam Lee - knitting, calligraphy
      { user_id: '55555555-5555-5555-5555-555555555555', hobby_id: hobbyMap.get('Knitting')! },
      { user_id: '55555555-5555-5555-5555-555555555555', hobby_id: hobbyMap.get('Calligraphy')! }
    ]

    const { error: userHobbiesError } = await supabase
      .from('user_hobbies')
      .upsert(userHobbies)

    if (userHobbiesError) {
      console.error('Error inserting user hobbies:', userHobbiesError)
      return
    }

    console.log('✅ Database seeded successfully!')
    console.log(`📊 Inserted:`)
    console.log(`   - ${hobbies.length} hobbies`)
    console.log(`   - ${tutorials.length} tutorials`)
    console.log(`   - ${sampleProfiles.length} sample profiles`)
    console.log(`   - ${samplePosts.length} sample posts`)
    console.log(`   - ${userHobbies.length} user hobby connections`)

  } catch (error) {
    console.error('❌ Error seeding database:', error)
  }
}

// Run if called directly
if (require.main === module) {
  seedDatabase()
}
