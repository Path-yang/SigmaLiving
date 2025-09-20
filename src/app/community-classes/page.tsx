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
    faChess
} from '@fortawesome/free-solid-svg-icons'
import { useState } from "react"
import Link from "next/link"

export default function CommunityClassesPage() {
    const [userName, setUserName] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [selectedWorkshop, setSelectedWorkshop] = useState(null)
    const [isReservationOpen, setIsReservationOpen] = useState(false)

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
        }
    ]

    // Function to get nearest community centre based on postal code
    const getNearestCommunityCentre = (postalCode) => {
        // Simple mapping for demonstration - in real app, this would use a proper geocoding service
        const postalCodeMap = {
            "319194": "Toa Payoh Community Centre",
            "569880": "Ang Mo Kio Community Centre",
            "579799": "Bishan Community Centre",
            "129880": "Clementi Community Centre",
            "609577": "Jurong East Community Centre",
            "528523": "Tampines Community Centre",
            "738526": "Woodlands Community Centre"
        }

        return postalCodeMap[postalCode] || "Nearest Community Centre"
    }

    const handleReserveSpot = (workshop) => {
        setSelectedWorkshop(workshop)
        setIsReservationOpen(true)
    }

    const handleConfirmReservation = () => {
        if (userName && postalCode) {
            // In a real app, this would make an API call to reserve the spot
            alert(`Reservation confirmed for ${userName}!\n\nWorkshop: ${selectedWorkshop.title}\nDate: ${selectedWorkshop.date}\nTime: ${selectedWorkshop.time}\nLocation: ${selectedWorkshop.location}\n\nNearest Community Centre: ${getNearestCommunityCentre(postalCode)}`)
            setIsReservationOpen(false)
            setUserName("")
            setPostalCode("")
            setSelectedWorkshop(null)
        } else {
            alert("Please fill in your name and postal code.")
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
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Upcoming Workshops</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Join our community classes and learn new skills while meeting wonderful people.
                        All classes are designed specifically for seniors and beginners.
                    </p>
                </section>

                {/* Workshops Grid */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {workshops.map((workshop) => (
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
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Postal Code *
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="Enter your postal code"
                                        value={postalCode}
                                        onChange={(e) => setPostalCode(e.target.value)}
                                        className="h-12 text-lg"
                                    />
                                    <p className="text-sm text-gray-500 mt-1">
                                        We'll recommend the nearest community centre to you
                                    </p>
                                </div>
                            </div>

                            {userName && postalCode && (
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <div className="flex items-center mb-2">
                                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                                        <span className="font-semibold text-green-800">Nearest Community Centre:</span>
                                    </div>
                                    <p className="text-green-700">{getNearestCommunityCentre(postalCode)}</p>
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
