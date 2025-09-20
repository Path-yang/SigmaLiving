"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  HeartHandshake,
  Search,
  MapPin,
  Users,
  Star,
  Phone,
  Mail,
  Clock,
  Navigation,
  CheckCircle,
  ArrowRight,
  Leaf,
  Palette,
  Dice6,
  BookOpen,
  Heart,
  Zap
} from "lucide-react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSeedling,
  faWalking,
  faMusic,
  faYinYang,
  faSwimmer,
  faPalette,
  faSpinner,
  faCamera,
  faMugHot,
  faHammer,
  faChess,
  faDice,
  faChessPawn,
  faSpellCheck,
  faDiceD6,
  faBook,
  faLanguage,
  faLaptop,
  faUtensils,
  faHandsHelping,
  faUserFriends,
  faSun,
  faOm,
  faFire,
  faDumbbell
} from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from "react"
import Link from "next/link"

export default function HobbiesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [postalCode, setPostalCode] = useState("")
  const [dailyHobby, setDailyHobby] = useState(null)
  const [selectedHobby, setSelectedHobby] = useState(null)

  const hobbyCategories = [
    {
      id: "active",
      name: "Active Hobbies",
      icon: <Zap className="w-8 h-8" />,
      color: "bg-green-100 text-green-700 border-green-200",
      hobbies: [
        {
          name: "Gardening",
          description: "Grow plants & veggies",
          difficulty: "Beginner",
          icon: <FontAwesomeIcon icon={faSeedling} className="w-8 h-8 text-green-600" />,
          intro: "Gardening is a wonderful way to connect with nature and grow your own fresh produce. It's gentle exercise that can be done at your own pace.",
          starterGuide: {
            items: ["Seeds or seedlings", "Potting soil", "Small pots or garden space", "Watering can", "Basic gardening tools"],
            whereToBuy: ["Local garden centers", "Home Depot", "Lowe's", "Online: Amazon, Burpee"],
            nearestPlaces: ["Green Thumb Garden Center (2.1 miles)", "Community Garden Supply (3.5 miles)"]
          }
        },
        {
          name: "Walking Groups",
          description: "Walk & chat with friends",
          difficulty: "Beginner",
          icon: <FontAwesomeIcon icon={faWalking} className="w-8 h-8 text-green-600" />,
          intro: "Walking groups are perfect for staying active while making new friends. It's low-impact and great for all fitness levels.",
          starterGuide: {
            items: ["Comfortable walking shoes", "Weather-appropriate clothing", "Water bottle", "Small backpack"],
            whereToBuy: ["Local shoe stores", "Sports Authority", "Online: Zappos, Amazon"],
            nearestPlaces: ["Central Park Walking Path (1.2 miles)", "Riverside Trail (2.8 miles)"]
          }
        },
        {
          name: "Dancing",
          description: "Move to the music",
          difficulty: "Intermediate",
          icon: <FontAwesomeIcon icon={faMusic} className="w-8 h-8 text-green-600" />,
          intro: "Dancing is a fun way to stay active and express yourself. Many styles are beginner-friendly and great for socializing.",
          starterGuide: {
            items: ["Comfortable dance shoes", "Loose-fitting clothes", "Water bottle", "Towel"],
            whereToBuy: ["Dance supply stores", "Online: Dancewear Solutions", "Local dance studios"],
            nearestPlaces: ["Dance Studio Downtown (1.8 miles)", "Community Center (2.3 miles)"]
          }
        },
        {
          name: "Tai Chi",
          description: "Gentle exercise",
          difficulty: "Beginner",
          icon: <FontAwesomeIcon icon={faYinYang} className="w-8 h-8 text-green-600" />,
          intro: "Tai Chi is a gentle form of exercise that combines slow, flowing movements with deep breathing and meditation.",
          starterGuide: {
            items: ["Comfortable loose clothing", "Flat-soled shoes", "Water bottle", "Yoga mat (optional)"],
            whereToBuy: ["Local martial arts stores", "Online: Amazon", "Sporting goods stores"],
            nearestPlaces: ["Zen Center (2.1 miles)", "Community Center (1.5 miles)"]
          }
        },
        {
          name: "Swimming",
          description: "Easy on joints",
          difficulty: "Beginner",
          icon: <FontAwesomeIcon icon={faSwimmer} className="w-8 h-8 text-green-600" />,
          intro: "Swimming is excellent low-impact exercise that's easy on your joints while providing a full-body workout.",
          starterGuide: {
            items: ["Swimsuit", "Swimming goggles", "Swim cap", "Towel", "Flip-flops"],
            whereToBuy: ["Local swim shops", "Sports Authority", "Online: SwimOutlet"],
            nearestPlaces: ["Community Pool (1.2 miles)", "YMCA (2.5 miles)"]
          }
        }
      ]
    },
    {
      id: "creative",
      name: "Creative Arts",
      icon: <Palette className="w-8 h-8" />,
      color: "bg-purple-100 text-purple-700 border-purple-200",
      hobbies: [
        {
          name: "Painting",
          description: "Paint with colors",
          difficulty: "Beginner",
          icon: <FontAwesomeIcon icon={faPalette} className="w-8 h-8 text-purple-600" />,
          intro: "Painting is a peaceful and rewarding hobby that allows you to express yourself creatively. No experience necessary!",
          starterGuide: {
            items: ["Watercolor or acrylic paints", "Paint brushes", "Canvas or watercolor paper", "Palette", "Water container"],
            whereToBuy: ["Local art stores", "Michaels", "Online: Dick Blick, Amazon"],
            nearestPlaces: ["Art Supply Store (1.8 miles)", "Community Art Center (2.2 miles)"]
          }
        },
        {
          name: "Knitting",
          description: "Make warm things",
          difficulty: "Beginner",
          icon: <FontAwesomeIcon icon={faSpinner} className="w-8 h-8 text-purple-600" />,
          intro: "Knitting is a relaxing craft that creates beautiful, useful items while keeping your hands busy and mind calm.",
          starterGuide: {
            items: ["Knitting needles (size 8-10)", "Yarn (worsted weight)", "Scissors", "Tapestry needle", "Stitch markers"],
            whereToBuy: ["Local yarn shops", "Michaels", "Joann Fabrics", "Online: KnitPicks"],
            nearestPlaces: ["Yarn & Thread Shop (2.1 miles)", "Craft Corner (1.5 miles)"]
          }
        },
        {
          name: "Photography",
          description: "Take great photos",
          difficulty: "Beginner",
          icon: <FontAwesomeIcon icon={faCamera} className="w-8 h-8 text-purple-600" />,
          intro: "Photography helps you see the world differently and preserve precious memories. Start with any camera you have.",
          starterGuide: {
            items: ["Camera (smartphone works!)", "Memory card", "Extra battery", "Camera bag", "Lens cleaning cloth"],
            whereToBuy: ["Local camera stores", "Best Buy", "Online: B&H Photo", "Amazon"],
            nearestPlaces: ["Photo Pro Shop (2.8 miles)", "Camera World (3.2 miles)"]
          }
        },
        { name: "Pottery", description: "Shape clay", difficulty: "Intermediate", icon: <FontAwesomeIcon icon={faMugHot} className="w-8 h-8 text-purple-600" /> },
        { name: "Woodworking", description: "Build things", difficulty: "Advanced", icon: <FontAwesomeIcon icon={faHammer} className="w-8 h-8 text-purple-600" /> }
      ]
    },
    {
      id: "social",
      name: "Social Games",
      icon: <Dice6 className="w-8 h-8" />,
      color: "bg-blue-100 text-blue-700 border-blue-200",
      hobbies: [
        {
          name: "Mahjong",
          description: "Classic tile game",
          difficulty: "Intermediate",
          icon: <FontAwesomeIcon icon={faChess} className="w-8 h-8 text-blue-600" />,
          intro: "Mahjong is a fascinating tile-based game that combines strategy, memory, and social interaction. Great for keeping your mind sharp!",
          starterGuide: {
            items: ["Mahjong tile set", "Playing surface", "Score cards", "Timer (optional)", "Rule book"],
            whereToBuy: ["Local game stores", "Amazon", "Target", "Walmart", "Online: Yellow Mountain Imports"],
            nearestPlaces: ["Game Master Store (1.5 miles)", "Community Center (2.1 miles)"]
          }
        },
        {
          name: "Bridge",
          description: "Card game for 4",
          difficulty: "Advanced",
          icon: <FontAwesomeIcon icon={faDice} className="w-8 h-8 text-blue-600" />,
          intro: "Bridge is a sophisticated card game that challenges your memory, strategy, and communication skills. Perfect for social gatherings.",
          starterGuide: {
            items: ["Standard deck of cards", "Bridge score pad", "Bidding boxes (optional)", "Rule book", "Partner"],
            whereToBuy: ["Local game stores", "Amazon", "Barnes & Noble", "Online: ACBL Store"],
            nearestPlaces: ["Bridge Club Downtown (2.3 miles)", "Senior Center (1.8 miles)"]
          }
        },
        {
          name: "Chess",
          description: "Strategy game",
          difficulty: "Intermediate",
          icon: <FontAwesomeIcon icon={faChessPawn} className="w-8 h-8 text-blue-600" />,
          intro: "Chess is the ultimate strategy game that exercises your brain and provides endless challenges. Great for all ages!",
          starterGuide: {
            items: ["Chess set", "Chess clock (optional)", "Notation pad", "Chess book for beginners", "Opponent"],
            whereToBuy: ["Local game stores", "Amazon", "Target", "Online: Chess.com Store"],
            nearestPlaces: ["Chess Club (2.5 miles)", "Library Chess Group (1.2 miles)"]
          }
        },
        {
          name: "Scrabble",
          description: "Word building",
          difficulty: "Beginner",
          icon: <FontAwesomeIcon icon={faSpellCheck} className="w-8 h-8 text-blue-600" />,
          intro: "Scrabble is a fun word game that expands your vocabulary while providing friendly competition. Perfect for word lovers!",
          starterGuide: {
            items: ["Scrabble board game", "Dictionary", "Score pad", "Timer (optional)", "2-4 players"],
            whereToBuy: ["Local game stores", "Amazon", "Target", "Walmart", "Online: Hasbro Store"],
            nearestPlaces: ["Game Store (1.8 miles)", "Community Center (2.0 miles)"]
          }
        },
        {
          name: "Board Games",
          description: "Fun for everyone",
          difficulty: "Beginner",
          icon: <FontAwesomeIcon icon={faDiceD6} className="w-8 h-8 text-blue-600" />,
          intro: "Board games bring people together for fun, laughter, and friendly competition. There's a game for every interest and skill level.",
          starterGuide: {
            items: ["Board game of choice", "Friends/family to play with", "Snacks and drinks", "Comfortable seating", "Good lighting"],
            whereToBuy: ["Local game stores", "Amazon", "Target", "Barnes & Noble", "Online: BoardGameGeek"],
            nearestPlaces: ["Game Night Store (2.1 miles)", "Community Game Night (1.5 miles)"]
          }
        }
      ]
    },
    {
      id: "learning",
      name: "Learning",
      icon: <BookOpen className="w-8 h-8" />,
      color: "bg-orange-100 text-orange-700 border-orange-200",
      hobbies: [
        {
          name: "Book Clubs",
          description: "Talk about books",
          difficulty: "Beginner",
          icon: <FontAwesomeIcon icon={faBook} className="w-8 h-8 text-orange-600" />,
          intro: "Book clubs are wonderful for sharing your love of reading with others and discovering new authors and genres you might not have tried.",
          starterGuide: {
            items: ["Current book selection", "Notebook for thoughts", "Reading glasses (if needed)", "Comfortable chair", "Good lighting"],
            whereToBuy: ["Local bookstores", "Amazon", "Barnes & Noble", "Library", "Online: Book of the Month"],
            nearestPlaces: ["Community Library (1.2 miles)", "Book Club Cafe (2.3 miles)"]
          }
        },
        {
          name: "Language Classes",
          description: "Learn new words",
          difficulty: "Beginner",
          icon: <FontAwesomeIcon icon={faLanguage} className="w-8 h-8 text-orange-600" />,
          intro: "Learning a new language keeps your mind active and opens doors to new cultures and friendships. It's never too late to start!",
          starterGuide: {
            items: ["Language textbook", "Notebook and pens", "Audio materials", "Dictionary", "Flashcards"],
            whereToBuy: ["Local bookstores", "Amazon", "Barnes & Noble", "Online: Duolingo, Babbel"],
            nearestPlaces: ["Community College (3.1 miles)", "Language Learning Center (2.8 miles)"]
          }
        },
        {
          name: "Computer Skills",
          description: "Use technology",
          difficulty: "Beginner",
          icon: <FontAwesomeIcon icon={faLaptop} className="w-8 h-8 text-orange-600" />,
          intro: "Computer skills help you stay connected with family, manage daily tasks, and explore new interests online. Start at your own pace!",
          starterGuide: {
            items: ["Computer or tablet", "Internet connection", "Notebook for notes", "Patience and time", "Basic mouse/keyboard"],
            whereToBuy: ["Best Buy", "Apple Store", "Amazon", "Local computer stores", "Online: Tech support"],
            nearestPlaces: ["Senior Tech Center (1.8 miles)", "Library Computer Lab (1.5 miles)"]
          }
        },
        {
          name: "Cooking Classes",
          description: "Make tasty food",
          difficulty: "Beginner",
          icon: <FontAwesomeIcon icon={faUtensils} className="w-8 h-8 text-orange-600" />,
          intro: "Cooking classes teach you new recipes and techniques while providing a fun social experience. Great for healthy eating and creativity!",
          starterGuide: {
            items: ["Apron", "Chef's knife", "Cutting board", "Measuring cups/spoons", "Notebook for recipes"],
            whereToBuy: ["Kitchen supply stores", "Amazon", "Williams Sonoma", "Online: Sur La Table"],
            nearestPlaces: ["Culinary School (2.5 miles)", "Community Kitchen (1.9 miles)"]
          }
        }
      ]
    },
    {
      id: "service",
      name: "Community Service",
      icon: <Heart className="w-8 h-8" />,
      color: "bg-pink-100 text-pink-700 border-pink-200",
      hobbies: [
        {
          name: "Volunteering",
          description: "Help others",
          difficulty: "Beginner",
          icon: <FontAwesomeIcon icon={faHandsHelping} className="w-8 h-8 text-pink-600" />,
          intro: "Volunteering is a rewarding way to give back to your community while meeting new people and staying active. There are opportunities for every interest and schedule.",
          starterGuide: {
            items: ["Comfortable clothing", "Positive attitude", "Time and energy", "Transportation", "Background check (if required)"],
            whereToBuy: ["No special equipment needed", "Local volunteer centers", "Online: VolunteerMatch", "Community organizations"],
            nearestPlaces: ["Volunteer Center (1.5 miles)", "Food Bank (2.2 miles)", "Animal Shelter (3.1 miles)"]
          }
        },
        {
          name: "Mentoring",
          description: "Share wisdom",
          difficulty: "Intermediate",
          icon: <FontAwesomeIcon icon={faUserFriends} className="w-8 h-8 text-pink-600" />,
          intro: "Mentoring allows you to share your life experience and knowledge with others who can benefit from your wisdom. It's incredibly fulfilling and meaningful.",
          starterGuide: {
            items: ["Patience and listening skills", "Life experience to share", "Time commitment", "Background check", "Training materials"],
            whereToBuy: ["No special equipment needed", "Local mentoring programs", "Online: Big Brothers Big Sisters", "Community centers"],
            nearestPlaces: ["Mentoring Program (2.1 miles)", "Youth Center (1.8 miles)", "Senior Center (1.2 miles)"]
          }
        },
        {
          name: "Community Gardens",
          description: "Grow food together",
          difficulty: "Beginner",
          icon: <FontAwesomeIcon icon={faSun} className="w-8 h-8 text-pink-600" />,
          intro: "Community gardens bring neighbors together to grow fresh food while learning about gardening and building friendships. Great for beginners!",
          starterGuide: {
            items: ["Garden tools", "Seeds or seedlings", "Watering can", "Garden gloves", "Sun hat"],
            whereToBuy: ["Local garden centers", "Home Depot", "Lowe's", "Online: Amazon", "Garden supply stores"],
            nearestPlaces: ["Community Garden (1.3 miles)", "Garden Center (2.5 miles)", "Urban Farm (3.2 miles)"]
          }
        }
      ]
    },
    {
      id: "wellness",
      name: "Wellness",
      icon: <Leaf className="w-8 h-8" />,
      color: "bg-teal-100 text-teal-700 border-teal-200",
      hobbies: [
        {
          name: "Yoga",
          description: "Gentle stretches",
          difficulty: "Beginner",
          icon: <FontAwesomeIcon icon={faOm} className="w-8 h-8 text-teal-600" />,
          intro: "Yoga combines gentle movement, breathing, and mindfulness to improve flexibility, strength, and inner peace. Perfect for all fitness levels.",
          starterGuide: {
            items: ["Yoga mat", "Comfortable clothing", "Water bottle", "Yoga blocks (optional)", "Blanket or towel"],
            whereToBuy: ["Local yoga studios", "Amazon", "Target", "Online: Lululemon, Gaiam", "Sporting goods stores"],
            nearestPlaces: ["Zen Yoga Studio (1.8 miles)", "Community Center (1.2 miles)", "Senior Yoga Class (2.3 miles)"]
          }
        },
        {
          name: "Meditation",
          description: "Find peace",
          difficulty: "Beginner",
          icon: <FontAwesomeIcon icon={faFire} className="w-8 h-8 text-teal-600" />,
          intro: "Meditation helps reduce stress, improve focus, and bring inner calm. It's a simple practice that can be done anywhere, anytime.",
          starterGuide: {
            items: ["Quiet space", "Comfortable cushion or chair", "Timer or meditation app", "Comfortable clothing", "Open mind"],
            whereToBuy: ["No special equipment needed", "Meditation apps: Headspace, Calm", "Online: Insight Timer", "Local meditation centers"],
            nearestPlaces: ["Meditation Center (2.1 miles)", "Community Meditation Group (1.5 miles)", "Zen Center (3.2 miles)"]
          }
        },
        {
          name: "Fitness Classes",
          description: "Stay strong",
          difficulty: "Beginner",
          icon: <FontAwesomeIcon icon={faDumbbell} className="w-8 h-8 text-teal-600" />,
          intro: "Fitness classes provide structured exercise in a supportive group setting. Great for motivation, social connection, and staying healthy.",
          starterGuide: {
            items: ["Comfortable workout clothes", "Water bottle", "Towel", "Proper shoes", "Positive attitude"],
            whereToBuy: ["Local fitness stores", "Amazon", "Target", "Online: Nike, Adidas", "Sporting goods stores"],
            nearestPlaces: ["Community Fitness Center (1.4 miles)", "Senior Fitness Class (1.8 miles)", "YMCA (2.6 miles)"]
          }
        }
      ]
    }
  ]

  const testimonials = [
    {
      name: "Margaret, 72",
      location: "Seattle, WA",
      hobby: "Gardening",
      quote: "Made great friends at the garden!",
      rating: 5
    },
    {
      name: "Robert, 68",
      location: "Austin, TX",
      hobby: "Photography",
      quote: "Love taking photos with new friends!",
      rating: 5
    },
    {
      name: "Dorothy, 75",
      location: "Portland, OR",
      hobby: "Book Club",
      quote: "3 years of fun book talks!",
      rating: 5
    }
  ]

  const localGroups = [
    {
      name: "Senior Gardeners Club",
      activity: "Gardening",
      location: "Community Center, 2.3 miles away",
      nextMeeting: "Every Tuesday, 10:00 AM",
      members: "12 active members",
      contact: "Call (555) 123-4567"
    },
    {
      name: "Morning Walkers Group",
      activity: "Walking",
      location: "Central Park, 1.8 miles away",
      nextMeeting: "Every Monday, Wednesday, Friday, 8:00 AM",
      members: "8 active members",
      contact: "Email: walkers@community.org"
    },
    {
      name: "Creative Arts Circle",
      activity: "Painting & Crafts",
      location: "Art Studio, 3.1 miles away",
      nextMeeting: "Every Thursday, 2:00 PM",
      members: "15 active members",
      contact: "Call (555) 987-6543"
    }
  ]

  // Filter categories based on selected category
  const categoryFiltered = selectedCategory === "all"
    ? hobbyCategories
    : hobbyCategories.filter(cat => cat.id === selectedCategory)

  // Filter hobbies based on search term
  const filteredCategories = categoryFiltered.map(category => ({
    ...category,
    hobbies: category.hobbies.filter(hobby =>
      hobby.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hobby.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.hobbies.length > 0)

  // Get all hobbies for daily suggestion
  const allHobbies = hobbyCategories.flatMap(category => category.hobbies)

  // Set daily hobby suggestion on page load
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * allHobbies.length)
    setDailyHobby(allHobbies[randomIndex])
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Skip Navigation Link for Accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50">
        Skip to main content
      </a>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <HeartHandshake className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Find Your Hobby,<br />
            <span className="text-green-600">Make Friends</span>
          </h1>
          <p className="text-2xl md:text-3xl text-gray-700 mb-8 leading-relaxed max-w-4xl mx-auto">
            Fun activities + Great people = Happy you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <div className="flex items-center text-lg text-gray-600">
              <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
              Free & Easy
            </div>
            <div className="flex items-center text-lg text-gray-600">
              <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
              All Levels Welcome
            </div>
            <div className="flex items-center text-lg text-gray-600">
              <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
              Local Groups
            </div>
          </div>
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white text-2xl py-6 px-12 rounded-xl h-auto"
            onClick={() => {
              document.getElementById('hobby-categories')?.scrollIntoView({
                behavior: 'smooth'
              })
            }}
          >
            Let's Go!
            <ArrowRight className="w-6 h-6 ml-2" />
          </Button>
        </div>
      </section>

      <main id="main-content" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Daily Hobby Suggestion */}
        {dailyHobby && (
          <section className="mb-12">
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-4 border-yellow-300 rounded-2xl p-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Today's Hobby Suggestion
              </h2>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <div className="text-6xl">{dailyHobby.icon}</div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {dailyHobby.name}
                  </h3>
                  <p className="text-lg md:text-xl text-gray-700 mb-4">
                    {dailyHobby.description}
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="lg"
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xl py-4 px-8 rounded-xl h-auto"
                        onClick={() => setSelectedHobby(dailyHobby)}
                      >
                        Learn More
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="text-3xl font-bold text-center mb-4">
                          {selectedHobby?.name}
                        </DialogTitle>
                        <DialogDescription className="text-xl text-center">
                          {selectedHobby?.intro}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-6">
                        <div className="bg-gray-50 p-6 rounded-xl">
                          <h4 className="text-2xl font-bold text-gray-900 mb-3">Starter Guide</h4>
                          {selectedHobby?.starterGuide && (
                            <div className="space-y-4">
                              <div>
                                <h5 className="text-lg font-semibold text-gray-800 mb-2">Basic Items to Get:</h5>
                                <ul className="list-disc list-inside text-gray-700 space-y-1">
                                  {selectedHobby.starterGuide.items.map((item, index) => (
                                    <li key={index}>{item}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h5 className="text-lg font-semibold text-gray-800 mb-2">Where to Buy:</h5>
                                <ul className="list-disc list-inside text-gray-700 space-y-1">
                                  {selectedHobby.starterGuide.whereToBuy.map((place, index) => (
                                    <li key={index}>{place}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h5 className="text-lg font-semibold text-gray-800 mb-2">Nearest Places:</h5>
                                <ul className="list-disc list-inside text-gray-700 space-y-1">
                                  {selectedHobby.starterGuide.nearestPlaces.map((place, index) => (
                                    <li key={index}>{place}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="text-center">
                          <Link href={`/community-classes?filter=${encodeURIComponent(selectedHobby?.name || '')}`}>
                            <Button
                              size="lg"
                              className="bg-green-600 hover:bg-green-700 text-white text-xl py-4 px-8 rounded-xl h-auto"
                            >
                              Join a Community Class
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </section>
        )}
        {/* Search and Filter Section */}
        <section className="mb-12">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900 mb-4">Find Your Hobby!</CardTitle>
              <CardDescription className="text-xl text-gray-600">
                Search or browse categories
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Input
                    type="text"
                    placeholder="Search hobbies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-14 text-xl px-6 pr-12 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  )}
                </div>
                <Button className="bg-green-600 hover:bg-green-700 text-white h-14 px-8 text-xl">
                  <Search className="w-6 h-6 mr-2" />
                  Search
                </Button>
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                <Button
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  onClick={() => setSelectedCategory("all")}
                  className="h-12 px-6 text-lg"
                >
                  All Categories
                </Button>
                {hobbyCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className="h-12 px-6 text-lg"
                  >
                    {category.icon}
                    <span className="ml-2">{category.name}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Hobby Categories */}
        <section id="hobby-categories" className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Hobby Categories</h2>
            {searchTerm && (
              <p className="text-lg text-gray-600">
                Found {filteredCategories.reduce((total, cat) => total + cat.hobbies.length, 0)} hobby{filteredCategories.reduce((total, cat) => total + cat.hobbies.length, 0) !== 1 ? 'ies' : ''} matching "{searchTerm}"
              </p>
            )}
          </div>
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">No hobbies found</h3>
              <p className="text-lg text-gray-600 mb-4">
                Try searching for something else or browse all categories
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                }}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Clear Search
              </Button>
            </div>
          ) : (
            <div className="space-y-12">
              {filteredCategories.map((category) => (
                <div key={category.id} className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-center mb-8">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mr-4 ${category.color}`}>
                      {category.icon}
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900">{category.name}</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.hobbies.map((hobby, index) => (
                      <Card key={index} className={`hover:shadow-lg transition-all duration-300 border-2 hover:border-green-300 ${category.id === 'active' ? 'bg-green-50 hover:bg-green-100' :
                        category.id === 'creative' ? 'bg-purple-50 hover:bg-purple-100' :
                          category.id === 'social' ? 'bg-blue-50 hover:bg-blue-100' :
                            category.id === 'learning' ? 'bg-orange-50 hover:bg-orange-100' :
                              category.id === 'service' ? 'bg-pink-50 hover:bg-pink-100' :
                                'bg-teal-50 hover:bg-teal-100'
                        }`}>
                        <CardHeader className="text-center pb-4">
                          <div className="text-5xl mb-4">{hobby.icon}</div>
                          <CardTitle className="text-2xl font-bold text-gray-900">{hobby.name}</CardTitle>
                          <CardDescription className="text-lg text-gray-600 leading-relaxed">
                            {hobby.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="text-center space-y-4">
                          <Badge
                            variant="secondary"
                            className={`text-lg px-4 py-2 ${hobby.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                              hobby.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}
                          >
                            {hobby.difficulty}
                          </Badge>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full h-12 text-lg border-2 hover:bg-green-50 hover:border-green-300"
                                onClick={() => setSelectedHobby(hobby)}
                              >
                                Learn More
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle className="text-3xl font-bold text-center mb-4">
                                  {selectedHobby?.name}
                                </DialogTitle>
                                <DialogDescription className="text-xl text-center">
                                  {selectedHobby?.intro}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-6">
                                <div className="bg-gray-50 p-6 rounded-xl">
                                  <h4 className="text-2xl font-bold text-gray-900 mb-3">Starter Guide</h4>
                                  {selectedHobby?.starterGuide && (
                                    <div className="space-y-4">
                                      <div>
                                        <h5 className="text-lg font-semibold text-gray-800 mb-2">Basic Items to Get:</h5>
                                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                                          {selectedHobby.starterGuide.items.map((item, index) => (
                                            <li key={index}>{item}</li>
                                          ))}
                                        </ul>
                                      </div>
                                      <div>
                                        <h5 className="text-lg font-semibold text-gray-800 mb-2">Where to Buy:</h5>
                                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                                          {selectedHobby.starterGuide.whereToBuy.map((place, index) => (
                                            <li key={index}>{place}</li>
                                          ))}
                                        </ul>
                                      </div>
                                      <div>
                                        <h5 className="text-lg font-semibold text-gray-800 mb-2">Nearest Places:</h5>
                                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                                          {selectedHobby.starterGuide.nearestPlaces.map((place, index) => (
                                            <li key={index}>{place}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    </div>
                                  )}
                                </div>
                                <div className="text-center">
                                  <Link href={`/community-classes?filter=${encodeURIComponent(hobby.name)}`}>
                                    <Button
                                      size="lg"
                                      className="bg-green-600 hover:bg-green-700 text-white text-xl py-4 px-8 rounded-xl h-auto"
                                    >
                                      Join a Community Class
                                    </Button>
                                  </Link>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Community Finder */}
        <section id="community-finder" className="mb-16">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900 mb-4">Find Local Groups</CardTitle>
              <CardDescription className="text-xl text-gray-600">
                Find groups near you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter your postal code"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="h-14 text-xl px-6 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white h-14 px-8 text-xl">
                  <Navigation className="w-6 h-6 mr-2" />
                  Find Groups
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {localGroups.map((group, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300 bg-blue-50 hover:bg-blue-100">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-gray-900">{group.name}</CardTitle>
                      <CardDescription className="text-lg text-gray-600">{group.activity}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-5 h-5 mr-2" />
                        <span className="text-lg">{group.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-5 h-5 mr-2" />
                        <span className="text-lg">{group.nextMeeting}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Users className="w-5 h-5 mr-2" />
                        <span className="text-lg">{group.members}</span>
                      </div>
                      <div className="pt-3">
                        <Button variant="outline" className="w-full h-12 text-lg">
                          Get Contact Info
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Success Stories */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Happy Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-yellow-50 hover:bg-yellow-100">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{testimonial.name}</CardTitle>
                  <CardDescription className="text-lg text-gray-600">
                    {testimonial.location} • {testimonial.hobby}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <blockquote className="text-lg text-gray-700 leading-relaxed italic">
                    "{testimonial.quote}"
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

      </main>
    </div>
  )
}
