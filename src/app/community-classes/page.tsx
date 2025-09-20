"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
    Calendar,
    MapPin,
    Clock,
    DollarSign,
    Users,
    ArrowLeft,
    ExternalLink,
    CheckCircle
} from "lucide-react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faSeedling,
    faPalette,
    faMusic,
    faBook,
    faDumbbell,
    faCamera,
    faChess,
    faUtensils,
    faSwimmer,
    faGamepad,
    faMicrophone,
    faMobile,
    faHeart,
    faDice,
    faCookie,
    faYinYang,
    faWalking,
    faPenFancy,
    faPuzzlePiece,
    faMugHot,
    faKeyboard
} from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

function CommunityClassesContent() {
    const [userName, setUserName] = useState("")
    const [emergencyContactName, setEmergencyContactName] = useState("")
    const [emergencyContactNumber, setEmergencyContactNumber] = useState("")
    const [emergencyContactRelationship, setEmergencyContactRelationship] = useState("")
    const [selectedWorkshop, setSelectedWorkshop] = useState(null)
    const [isReservationOpen, setIsReservationOpen] = useState(false)
    const [filter, setFilter] = useState("")
    const searchParams = useSearchParams()

    // Read filter parameter from URL on component mount
    useEffect(() => {
        const filterParam = searchParams.get('filter')
        if (filterParam) {
            setFilter(filterParam)
        }
    }, [searchParams])

    // Sample workshops data
    const workshops = [
        {
            id: 1,
            title: "Beginner Gardening Workshop",
            date: "2024-01-15",
            time: "10:00 AM - 12:00 PM",
            location: "Toa Payoh Community Centre",
            address: "93 Toa Payoh Central, Singapore 319194",
            cost: "Free",
            maxParticipants: 20,
            currentParticipants: 12,
            instructor: "Ms. Sarah Lim",
            description: "Learn the basics of gardening including soil preparation, plant selection, and basic care techniques.",
            icon: <FontAwesomeIcon icon={faSeedling} className="w-8 h-8 text-green-600" />,
            category: "Active Hobbies"
        },
        {
            id: 2,
            title: "Watercolor Painting for Seniors",
            date: "2024-01-18",
            time: "2:00 PM - 4:00 PM",
            location: "Ang Mo Kio Community Centre",
            address: "6000 Ang Mo Kio Avenue 5, Singapore 569880",
            cost: "$15",
            maxParticipants: 15,
            currentParticipants: 8,
            instructor: "Mr. David Tan",
            description: "Discover the joy of watercolor painting with techniques suitable for all skill levels.",
            icon: <FontAwesomeIcon icon={faPalette} className="w-8 h-8 text-purple-600" />,
            category: "Creative Arts"
        },
        {
            id: 3,
            title: "Line Dancing for Beginners",
            date: "2024-01-20",
            time: "7:00 PM - 8:30 PM",
            location: "Bishan Community Centre",
            address: "51 Bishan Street 13, Singapore 579799",
            cost: "$10",
            maxParticipants: 25,
            currentParticipants: 18,
            instructor: "Ms. Mary Wong",
            description: "Learn fun line dancing routines that are easy on the joints and great for socializing.",
            icon: <FontAwesomeIcon icon={faMusic} className="w-8 h-8 text-blue-600" />,
            category: "Active Hobbies"
        },
        {
            id: 4,
            title: "Digital Photography Basics",
            date: "2024-01-22",
            time: "10:00 AM - 12:00 PM",
            location: "Clementi Community Centre",
            address: "220 Clementi Avenue 2, Singapore 129880",
            cost: "$20",
            maxParticipants: 12,
            currentParticipants: 6,
            instructor: "Mr. James Lee",
            description: "Master your smartphone camera and learn basic photography techniques.",
            icon: <FontAwesomeIcon icon={faCamera} className="w-8 h-8 text-indigo-600" />,
            category: "Creative Arts"
        },
        {
            id: 5,
            title: "Book Club Discussion",
            date: "2024-01-25",
            time: "2:00 PM - 3:30 PM",
            location: "Jurong East Community Centre",
            address: "35 Jurong East Street 24, Singapore 609577",
            cost: "Free",
            maxParticipants: 20,
            currentParticipants: 15,
            instructor: "Ms. Linda Chen",
            description: "Join our monthly book discussion. This month's book: 'The Seven Husbands of Evelyn Hugo'.",
            icon: <FontAwesomeIcon icon={faBook} className="w-8 h-8 text-orange-600" />,
            category: "Learning"
        },
        {
            id: 6,
            title: "Senior Fitness Class",
            date: "2024-01-28",
            time: "9:00 AM - 10:00 AM",
            location: "Tampines Community Centre",
            address: "1 Tampines Walk, Singapore 528523",
            cost: "$8",
            maxParticipants: 30,
            currentParticipants: 22,
            instructor: "Mr. Robert Lim",
            description: "Low-impact exercises designed specifically for seniors to improve strength and flexibility.",
            icon: <FontAwesomeIcon icon={faDumbbell} className="w-8 h-8 text-teal-600" />,
            category: "Wellness"
        },
        {
            id: 7,
            title: "Chess for Beginners",
            date: "2024-01-30",
            time: "3:00 PM - 5:00 PM",
            location: "Woodlands Community Centre",
            address: "1 Woodlands Street 81, Singapore 738526",
            cost: "Free",
            maxParticipants: 16,
            currentParticipants: 9,
            instructor: "Mr. Ahmad Hassan",
            description: "Learn chess fundamentals and strategies in a friendly, supportive environment.",
            icon: <FontAwesomeIcon icon={faChess} className="w-8 h-8 text-blue-600" />,
            category: "Social Games"
        },
        {
            id: 8,
            title: "Traditional Chinese Calligraphy",
            date: "2024-02-02",
            time: "10:00 AM - 12:00 PM",
            location: "Chinatown Community Centre",
            address: "22 New Bridge Road, Singapore 059413",
            cost: "$12",
            maxParticipants: 12,
            currentParticipants: 7,
            instructor: "Master Chen Wei Ming",
            description: "Learn the art of Chinese calligraphy with traditional brush techniques and stroke order.",
            icon: <FontAwesomeIcon icon={faPenFancy} className="w-8 h-8 text-red-600" />,
            category: "Creative Arts"
        },
        {
            id: 9,
            title: "Tai Chi for Health & Wellness",
            date: "2024-02-05",
            time: "8:00 AM - 9:00 AM",
            location: "Marina Bay Sands Park",
            address: "10 Bayfront Avenue, Singapore 018956",
            cost: "Free",
            maxParticipants: 40,
            currentParticipants: 28,
            instructor: "Sifu Li Ming",
            description: "Gentle Tai Chi movements to improve balance, flexibility, and inner peace.",
            icon: <FontAwesomeIcon icon={faYinYang} className="w-8 h-8 text-green-600" />,
            category: "Wellness"
        },
        {
            id: 10,
            title: "Mahjong Strategy Workshop",
            date: "2024-02-08",
            time: "2:00 PM - 4:00 PM",
            location: "Geylang Community Centre",
            address: "50 Geylang East Avenue 1, Singapore 389777",
            cost: "$8",
            maxParticipants: 16,
            currentParticipants: 11,
            instructor: "Ms. Tan Bee Hoon",
            description: "Master the strategies and winning techniques of traditional Mahjong.",
            icon: <FontAwesomeIcon icon={faDice} className="w-8 h-8 text-purple-600" />,
            category: "Social Games"
        },
        {
            id: 11,
            title: "Healthy Cooking for Seniors",
            date: "2024-02-10",
            time: "11:00 AM - 1:00 PM",
            location: "Bedok Community Centre",
            address: "850 New Upper Changi Road, Singapore 467352",
            cost: "$15",
            maxParticipants: 18,
            currentParticipants: 13,
            instructor: "Chef Maria Santos",
            description: "Learn to prepare nutritious, easy-to-digest meals perfect for senior health.",
            icon: <FontAwesomeIcon icon={faUtensils} className="w-8 h-8 text-orange-600" />,
            category: "Cooking & Food"
        },
        {
            id: 12,
            title: "Karaoke Singing Circle",
            date: "2024-02-12",
            time: "7:00 PM - 9:00 PM",
            location: "Kallang Community Centre",
            address: "1 Stadium Walk, Singapore 397688",
            cost: "$10",
            maxParticipants: 20,
            currentParticipants: 16,
            instructor: "Ms. Jenny Lim",
            description: "Sing your favorite songs in a supportive, fun environment with friends.",
            icon: <FontAwesomeIcon icon={faMicrophone} className="w-8 h-8 text-pink-600" />,
            category: "Music & Culture"
        },
        {
            id: 13,
            title: "Smartphone Photography Workshop",
            date: "2024-02-15",
            time: "10:00 AM - 12:00 PM",
            location: "Orchard Community Centre",
            address: "1 Orchard Boulevard, Singapore 248649",
            cost: "$18",
            maxParticipants: 15,
            currentParticipants: 9,
            instructor: "Mr. Alex Wong",
            description: "Learn to take amazing photos with your smartphone camera and basic editing.",
            icon: <FontAwesomeIcon icon={faMobile} className="w-8 h-8 text-indigo-600" />,
            category: "Technology"
        },
        {
            id: 14,
            title: "Gentle Yoga for Seniors",
            date: "2024-02-18",
            time: "9:00 AM - 10:30 AM",
            location: "Sengkang Community Centre",
            address: "2 Sengkang Square, Singapore 545025",
            cost: "$12",
            maxParticipants: 25,
            currentParticipants: 19,
            instructor: "Yoga Master Priya",
            description: "Gentle yoga poses and breathing exercises designed specifically for seniors.",
            icon: <FontAwesomeIcon icon={faHeart} className="w-8 h-8 text-red-600" />,
            category: "Wellness"
        },
        {
            id: 15,
            title: "Origami Paper Crafting",
            date: "2024-02-20",
            time: "2:00 PM - 4:00 PM",
            location: "Punggol Community Centre",
            address: "1 Hougang Avenue 10, Singapore 538768",
            cost: "$8",
            maxParticipants: 20,
            currentParticipants: 14,
            instructor: "Ms. Yuki Tanaka",
            description: "Create beautiful paper art through the traditional Japanese craft of origami.",
            icon: <FontAwesomeIcon icon={faPuzzlePiece} className="w-8 h-8 text-blue-600" />,
            category: "Creative Arts"
        },
        {
            id: 16,
            title: "Board Games Social Hour",
            date: "2024-02-22",
            time: "3:00 PM - 5:00 PM",
            location: "Yishun Community Centre",
            address: "101 Yishun Avenue 1, Singapore 769130",
            cost: "Free",
            maxParticipants: 24,
            currentParticipants: 18,
            instructor: "Mr. David Kumar",
            description: "Play classic and modern board games while making new friends.",
            icon: <FontAwesomeIcon icon={faGamepad} className="w-8 h-8 text-green-600" />,
            category: "Social Games"
        },
        {
            id: 17,
            title: "Traditional Tea Ceremony",
            date: "2024-02-25",
            time: "2:00 PM - 3:30 PM",
            location: "Bukit Timah Community Centre",
            address: "170 Upper Bukit Timah Road, Singapore 588179",
            cost: "$20",
            maxParticipants: 12,
            currentParticipants: 8,
            instructor: "Tea Master Lin Wei",
            description: "Learn the art and philosophy of traditional Chinese tea ceremony.",
            icon: <FontAwesomeIcon icon={faMugHot} className="w-8 h-8 text-green-600" />,
            category: "Cooking & Food"
        },
        {
            id: 18,
            title: "Piano for Beginners",
            date: "2024-02-28",
            time: "4:00 PM - 5:30 PM",
            location: "Queenstown Community Centre",
            address: "365 Commonwealth Avenue, Singapore 149732",
            cost: "$25",
            maxParticipants: 8,
            currentParticipants: 5,
            instructor: "Ms. Sarah Chen",
            description: "Learn basic piano techniques and play simple melodies in a supportive environment.",
            icon: <FontAwesomeIcon icon={faKeyboard} className="w-8 h-8 text-purple-600" />,
            category: "Music & Culture"
        },
        {
            id: 19,
            title: "Swimming for Seniors",
            date: "2024-03-02",
            time: "10:00 AM - 11:00 AM",
            location: "Jurong West Swimming Complex",
            address: "20 Jurong West Street 93, Singapore 648965",
            cost: "$8",
            maxParticipants: 20,
            currentParticipants: 12,
            instructor: "Coach Michael Tan",
            description: "Low-impact swimming exercises perfect for joint health and cardiovascular fitness.",
            icon: <FontAwesomeIcon icon={faSwimmer} className="w-8 h-8 text-blue-600" />,
            category: "Wellness"
        },
        {
            id: 20,
            title: "Baking Traditional Treats",
            date: "2024-03-05",
            time: "10:00 AM - 12:30 PM",
            location: "Pasir Ris Community Centre",
            address: "1 Pasir Ris Drive 4, Singapore 519457",
            cost: "$18",
            maxParticipants: 16,
            currentParticipants: 11,
            instructor: "Chef Margaret Lee",
            description: "Learn to bake traditional Singaporean and Asian treats with simple techniques.",
            icon: <FontAwesomeIcon icon={faCookie} className="w-8 h-8 text-yellow-600" />,
            category: "Cooking & Food"
        },
        {
            id: 21,
            title: "Walking Group - Nature Trail",
            date: "2024-03-08",
            time: "8:00 AM - 9:30 AM",
            location: "MacRitchie Reservoir Park",
            address: "MacRitchie Reservoir, Singapore 298717",
            cost: "Free",
            maxParticipants: 30,
            currentParticipants: 22,
            instructor: "Guide Robert Lim",
            description: "Join our weekly nature walk through beautiful trails with guided commentary.",
            icon: <FontAwesomeIcon icon={faWalking} className="w-8 h-8 text-green-600" />,
            category: "Active Hobbies"
        },
        {
            id: 22,
            title: "Video Call with Family Workshop",
            date: "2024-03-10",
            time: "2:00 PM - 3:30 PM",
            location: "Tampines Community Centre",
            address: "1 Tampines Walk, Singapore 528523",
            cost: "Free",
            maxParticipants: 20,
            currentParticipants: 15,
            instructor: "Tech Support Amy",
            description: "Learn to use video calling apps to stay connected with family and friends.",
            icon: <FontAwesomeIcon icon={faMobile} className="w-8 h-8 text-blue-600" />,
            category: "Technology"
        },
        {
            id: 23,
            title: "Beginner Gardening Workshop",
            date: "2024-03-15",
            time: "10:00 AM - 12:00 PM",
            location: "Toa Payoh Community Centre",
            address: "93 Toa Payoh Central, Singapore 319194",
            cost: "Free",
            maxParticipants: 20,
            currentParticipants: 8,
            instructor: "Ms. Sarah Lim",
            description: "Learn the basics of gardening including soil preparation, plant selection, and basic care techniques.",
            icon: <FontAwesomeIcon icon={faSeedling} className="w-8 h-8 text-green-600" />,
            category: "Active Hobbies"
        },
        {
            id: 24,
            title: "Watercolor Painting for Seniors",
            date: "2024-03-18",
            time: "2:00 PM - 4:00 PM",
            location: "Ang Mo Kio Community Centre",
            address: "6000 Ang Mo Kio Avenue 5, Singapore 569880",
            cost: "$15",
            maxParticipants: 15,
            currentParticipants: 6,
            instructor: "Mr. David Tan",
            description: "Discover the joy of watercolor painting with techniques suitable for all skill levels.",
            icon: <FontAwesomeIcon icon={faPalette} className="w-8 h-8 text-purple-600" />,
            category: "Creative Arts"
        },
        {
            id: 25,
            title: "Line Dancing for Beginners",
            date: "2024-03-20",
            time: "7:00 PM - 8:30 PM",
            location: "Bishan Community Centre",
            address: "51 Bishan Street 13, Singapore 579799",
            cost: "$10",
            maxParticipants: 25,
            currentParticipants: 14,
            instructor: "Ms. Mary Wong",
            description: "Learn fun line dancing routines that are easy on the joints and great for socializing.",
            icon: <FontAwesomeIcon icon={faMusic} className="w-8 h-8 text-blue-600" />,
            category: "Active Hobbies"
        },
        {
            id: 26,
            title: "Tai Chi for Health & Wellness",
            date: "2024-03-22",
            time: "8:00 AM - 9:00 AM",
            location: "Marina Bay Sands Park",
            address: "10 Bayfront Avenue, Singapore 018956",
            cost: "Free",
            maxParticipants: 40,
            currentParticipants: 31,
            instructor: "Sifu Li Ming",
            description: "Gentle Tai Chi movements to improve balance, flexibility, and inner peace.",
            icon: <FontAwesomeIcon icon={faYinYang} className="w-8 h-8 text-green-600" />,
            category: "Wellness"
        },
        {
            id: 27,
            title: "Mahjong Strategy Workshop",
            date: "2024-03-25",
            time: "2:00 PM - 4:00 PM",
            location: "Geylang Community Centre",
            address: "50 Geylang East Avenue 1, Singapore 389777",
            cost: "$8",
            maxParticipants: 16,
            currentParticipants: 9,
            instructor: "Ms. Tan Bee Hoon",
            description: "Master the strategies and winning techniques of traditional Mahjong.",
            icon: <FontAwesomeIcon icon={faDice} className="w-8 h-8 text-purple-600" />,
            category: "Social Games"
        },
        {
            id: 28,
            title: "Traditional Chinese Calligraphy",
            date: "2024-03-28",
            time: "10:00 AM - 12:00 PM",
            location: "Chinatown Community Centre",
            address: "22 New Bridge Road, Singapore 059413",
            cost: "$12",
            maxParticipants: 12,
            currentParticipants: 5,
            instructor: "Master Chen Wei Ming",
            description: "Learn the art of Chinese calligraphy with traditional brush techniques and stroke order.",
            icon: <FontAwesomeIcon icon={faPenFancy} className="w-8 h-8 text-red-600" />,
            category: "Creative Arts"
        },
        {
            id: 29,
            title: "Gentle Yoga for Seniors",
            date: "2024-04-02",
            time: "9:00 AM - 10:30 AM",
            location: "Sengkang Community Centre",
            address: "2 Sengkang Square, Singapore 545025",
            cost: "$12",
            maxParticipants: 25,
            currentParticipants: 17,
            instructor: "Yoga Master Priya",
            description: "Gentle yoga poses and breathing exercises designed specifically for seniors.",
            icon: <FontAwesomeIcon icon={faHeart} className="w-8 h-8 text-red-600" />,
            category: "Wellness"
        },
        {
            id: 30,
            title: "Healthy Cooking for Seniors",
            date: "2024-04-05",
            time: "11:00 AM - 1:00 PM",
            location: "Bedok Community Centre",
            address: "850 New Upper Changi Road, Singapore 467352",
            cost: "$15",
            maxParticipants: 18,
            currentParticipants: 10,
            instructor: "Chef Maria Santos",
            description: "Learn to prepare nutritious, easy-to-digest meals perfect for senior health.",
            icon: <FontAwesomeIcon icon={faUtensils} className="w-8 h-8 text-orange-600" />,
            category: "Cooking & Food"
        },
        {
            id: 31,
            title: "Walking Group - Nature Trail",
            date: "2024-04-08",
            time: "8:00 AM - 9:30 AM",
            location: "MacRitchie Reservoir Park",
            address: "MacRitchie Reservoir, Singapore 298717",
            cost: "Free",
            maxParticipants: 30,
            currentParticipants: 19,
            instructor: "Guide Robert Lim",
            description: "Join our weekly nature walk through beautiful trails with guided commentary.",
            icon: <FontAwesomeIcon icon={faWalking} className="w-8 h-8 text-green-600" />,
            category: "Active Hobbies"
        },
        {
            id: 32,
            title: "Karaoke Singing Circle",
            date: "2024-04-12",
            time: "7:00 PM - 9:00 PM",
            location: "Kallang Community Centre",
            address: "1 Stadium Walk, Singapore 397688",
            cost: "$10",
            maxParticipants: 20,
            currentParticipants: 13,
            instructor: "Ms. Jenny Lim",
            description: "Sing your favorite songs in a supportive, fun environment with friends.",
            icon: <FontAwesomeIcon icon={faMicrophone} className="w-8 h-8 text-pink-600" />,
            category: "Music & Culture"
        }
    ]

    // Mapping hobby names to workshop filters
    const hobbyToWorkshopMapping = {
        "Gardening": ["gardening", "garden"],
        "Walking Groups": ["walking", "walk"],
        "Dancing": ["dancing", "dance"],
        "Painting": ["painting", "paint", "watercolor"],
        "Photography": ["photography", "photo", "camera"],
        "Cooking": ["cooking", "cook", "baking", "bake"],
        "Tai Chi": ["tai chi", "taichi"],
        "Yoga": ["yoga"],
        "Swimming": ["swimming", "swim"],
        "Chess": ["chess"],
        "Mahjong": ["mahjong"],
        "Board Games": ["board games", "board game"],
        "Karaoke": ["karaoke", "singing", "sing"],
        "Piano": ["piano"],
        "Calligraphy": ["calligraphy"],
        "Origami": ["origami"],
        "Tea Ceremony": ["tea", "ceremony"],
        "Smartphone Apps": ["smartphone", "phone", "video call", "technology"],
        "Book Club": ["book", "reading", "discussion"]
    }

    // Filter workshops based on the hobby filter
    const filteredWorkshops = filter
        ? workshops.filter(workshop => {
            const hobbyKeywords = hobbyToWorkshopMapping[filter] || []
            const workshopText = `${workshop.title} ${workshop.description} ${workshop.category}`.toLowerCase()
            return hobbyKeywords.some(keyword => workshopText.includes(keyword.toLowerCase()))
        })
        : workshops

    const handleReserveSpot = (workshop) => {
        setSelectedWorkshop(workshop)
        setIsReservationOpen(true)
    }

    const handleConfirmReservation = () => {
        if (userName && emergencyContactName && emergencyContactNumber && emergencyContactRelationship) {
            // In a real app, this would make an API call to reserve the spot
            alert(`Reservation confirmed for ${userName}!\n\nWorkshop: ${selectedWorkshop.title}\nDate: ${selectedWorkshop.date}\nTime: ${selectedWorkshop.time}\nLocation: ${selectedWorkshop.location}\n\nEmergency Contact: ${emergencyContactName} (${emergencyContactRelationship})\nContact Number: ${emergencyContactNumber}`)
            setIsReservationOpen(false)
            setUserName("")
            setEmergencyContactName("")
            setEmergencyContactNumber("")
            setEmergencyContactRelationship("")
            setSelectedWorkshop(null)
        } else {
            alert("Please fill in all required fields including your name and emergency contact information.")
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-6">
                        <div className="flex items-center">
                            <Link href="/hobbies">
                                <Button variant="outline" size="sm" className="mr-4">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to Hobbies
                                </Button>
                            </Link>
                            <h1 className="text-3xl font-bold text-gray-900">Community Classes</h1>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hero Section */}
                <section className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        {filter ? `${filter} Workshops` : "Upcoming Workshops"}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        {filter
                            ? `Showing ${filter.toLowerCase()} related workshops. Join our community classes and learn new skills while meeting wonderful people.`
                            : "Join our community classes and learn new skills while meeting wonderful people. All classes are designed specifically for seniors and beginners."
                        }
                    </p>
                    {filter && (
                        <div className="mt-4">
                            <Button
                                variant="outline"
                                size="lg"
                                className="text-lg px-8 py-3"
                                onClick={() => setFilter("")}
                            >
                                View All Workshops
                            </Button>
                        </div>
                    )}
                </section>

                {/* Workshops Grid */}
                {filteredWorkshops.length > 0 ? (
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredWorkshops.map((workshop) => (
                            <Card key={workshop.id} className="hover:shadow-lg transition-shadow duration-300">
                                <CardHeader>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="text-4xl">{workshop.icon}</div>
                                        <Badge variant="secondary" className="text-sm">
                                            {workshop.category}
                                        </Badge>
                                    </div>
                                    <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                                        {workshop.title}
                                    </CardTitle>
                                    <CardDescription className="text-gray-600">
                                        {workshop.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-3">
                                        <div className="flex items-center text-gray-600">
                                            <Calendar className="w-5 h-5 mr-3" />
                                            <span className="text-lg">{new Date(workshop.date).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <Clock className="w-5 h-5 mr-3" />
                                            <span className="text-lg">{workshop.time}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <MapPin className="w-5 h-5 mr-3" />
                                            <div>
                                                <span className="text-lg">{workshop.location}</span>
                                                <br />
                                                <span className="text-sm text-gray-500">{workshop.address}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <DollarSign className="w-5 h-5 mr-3" />
                                            <span className="text-lg font-semibold">{workshop.cost}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <Users className="w-5 h-5 mr-3" />
                                            <span className="text-lg">{workshop.currentParticipants}/{workshop.maxParticipants} participants</span>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <Button
                                            className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-3"
                                            onClick={() => handleReserveSpot(workshop)}
                                            disabled={workshop.currentParticipants >= workshop.maxParticipants}
                                        >
                                            {workshop.currentParticipants >= workshop.maxParticipants ? "Fully Booked" : "Reserve Spot"}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </section>
                ) : (
                    <section className="text-center py-12">
                        <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">No Workshops Found</h3>
                            <p className="text-gray-600 mb-6">
                                We don't have any {filter.toLowerCase()} workshops available at the moment.
                            </p>
                            <Button
                                className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-3"
                                onClick={() => setFilter("")}
                            >
                                View All Workshops
                            </Button>
                        </div>
                    </section>
                )}

                {/* Reservation Modal */}
                <Dialog open={isReservationOpen} onOpenChange={setIsReservationOpen}>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-center mb-2">
                                Reserve Your Spot
                            </DialogTitle>
                            <DialogDescription className="text-center text-lg">
                                {selectedWorkshop?.title}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-6">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-gray-900 mb-2">Workshop Details:</h4>
                                <p className="text-sm text-gray-600">
                                    <strong>Date:</strong> {selectedWorkshop && new Date(selectedWorkshop.date).toLocaleDateString()}<br />
                                    <strong>Time:</strong> {selectedWorkshop?.time}<br />
                                    <strong>Location:</strong> {selectedWorkshop?.location}<br />
                                    <strong>Cost:</strong> {selectedWorkshop?.cost}
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Your Name *
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        className="h-12 text-lg"
                                    />
                                </div>

                                <div className="border-t pt-4">
                                    <h4 className="font-semibold text-gray-900 mb-3">Emergency Contact Information *</h4>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Emergency Contact Name *
                                            </label>
                                            <Input
                                                type="text"
                                                placeholder="Enter emergency contact's full name"
                                                value={emergencyContactName}
                                                onChange={(e) => setEmergencyContactName(e.target.value)}
                                                className="h-12 text-lg"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Contact Number *
                                            </label>
                                            <Input
                                                type="tel"
                                                placeholder="Enter contact number"
                                                value={emergencyContactNumber}
                                                onChange={(e) => setEmergencyContactNumber(e.target.value)}
                                                className="h-12 text-lg"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Relationship *
                                            </label>
                                            <Input
                                                type="text"
                                                placeholder="e.g., Spouse, Child, Friend, Sibling"
                                                value={emergencyContactRelationship}
                                                onChange={(e) => setEmergencyContactRelationship(e.target.value)}
                                                className="h-12 text-lg"
                                            />
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2">
                                        This information will only be used in case of emergency during the workshop
                                    </p>
                                </div>
                            </div>

                            {userName && emergencyContactName && emergencyContactNumber && emergencyContactRelationship && (
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <div className="flex items-center mb-2">
                                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                                        <span className="font-semibold text-green-800">Ready to Reserve!</span>
                                    </div>
                                    <p className="text-green-700">All required information has been provided.</p>
                                </div>
                            )}

                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    className="flex-1 h-12 text-lg"
                                    onClick={() => setIsReservationOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white h-12 text-lg"
                                    onClick={handleConfirmReservation}
                                >
                                    Confirm Reservation
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </main>
        </div>
    )
}

export default function CommunityClassesPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading community classes...</p>
                </div>
            </div>
        }>
            <CommunityClassesContent />
        </Suspense>
    )
}
