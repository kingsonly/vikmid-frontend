"use client"

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Palette, Music, BookOpen, GraduationCap, Code, Heart } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useApiCall } from '@/utils/useApiCall'
import { setActiveHub } from '../../store/users-basic-details/usersDetailsSlice';
import { LoadingSpinner } from '../loader/Loader'
// const hubs = [
//     { id: 1, name: "Art & Design", description: "For visual artists, graphic designers, and illustrators", icon: Palette },
//     { id: 2, name: "Music & Audio", description: "For musicians, producers, and podcasters", icon: Music },
//     { id: 3, name: "Writing & Publishing", description: "For authors, journalists, and bloggers", icon: BookOpen },
//     { id: 4, name: "Education & Academia", description: "For teachers, researchers, and educational content creators", icon: GraduationCap },
//     { id: 5, name: "Tech & Programming", description: "For developers, tech reviewers, and IT professionals", icon: Code },
//     { id: 6, name: "Lifestyle & Wellness", description: "For fitness instructors, nutritionists, and life coaches", icon: Heart },
// ]
interface Hub {
    id: number;
    userId: number;
    title: string;
    hubUrl: string;
}
export default function HubSelector() {
    const dispatch = useDispatch<AppDispatch>();
    const [selectedHub, setSelectedHub] = useState<number | null>(null)
    const [hubs, setHubs] = useState<Hub[]>([])
    const [activeHubLoader, setActiveHubLoader] = useState<boolean>(false)
    const { apiCall } = useApiCall();
    useEffect(() => {
        getHubs()
    }, [])

    const getHubs = async () => {
        try {
            const response = await apiCall({
                endpoint: "/hub",
                method: "get",
                "showToast": false,
            }
            );
            if (response) {
                setHubs(response.data)
            }
        } catch (error) {
            console.error("Error fetching hubs:", error);
        }
    }

    const handleContinue = () => {
        setActiveHubLoader(true)
        if (selectedHub) {
            dispatch(setActiveHub(selectedHub))
        }
        setActiveHubLoader(false)
    }

    return (
        <div className="space-y-6 bg-gray-900 text-white p-6 rounded-lg">
            <h1 className="text-4xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 text-center">
                Welcome to VIKMID!
            </h1>
            <h2 className="text-2xl font-bold mb-4 text-gray-200 text-center">Choose Your Creator Hub</h2>
            <p className="text-lg mb-8 text-gray-400 text-center max-w-2xl mx-auto">
                Select your hub. Don't worry, you can always change this later.
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {hubs.map((hub) => (
                    <Card
                        key={hub.id}
                        className={`cursor-pointer transition-all duration-300 transform hover:scale-105 bg-gray-800 border-gray-700 ${selectedHub === hub.id
                            ? 'ring-2 ring-purple-500 shadow-lg shadow-purple-500/50'
                            : 'hover:shadow-md hover:shadow-purple-500/30'
                            }`}
                        onClick={() => setSelectedHub(hub.id)}
                    >
                        <CardHeader className="text-center relative">
                            {selectedHub === hub.id && (
                                <Badge variant="secondary" className="absolute top-2 right-2 bg-purple-500 text-white">
                                    <CheckCircle className="w-4 h-4" />
                                </Badge>
                            )}
                            {/* <hub.icon className={`w-12 h-12 mx-auto mb-2 ${selectedHub === hub.id ? 'text-purple-400' : 'text-gray-400'}`} /> */}
                            <CardTitle className={`text-xl ${selectedHub === hub.id ? 'text-purple-400' : 'text-gray-200'}`}>{hub.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-center text-gray-400">{hub.hubUrl}</CardDescription>
                        </CardContent>
                        <CardFooter className="flex flex-col items-center justify-center">
                            {selectedHub === hub.id ?
                                activeHubLoader ? <LoadingSpinner /> : <Button
                                    size="lg"
                                    onClick={handleContinue}
                                    className="mt-4 w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
                                >
                                    Continue Your Journey
                                </Button> : null
                            }
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}