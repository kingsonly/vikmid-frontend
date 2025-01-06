'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CoinsIcon } from 'lucide-react'
import Link from 'next/link'

// Mock data for subscribed creators
const subscribedCreators = [
    { id: 1, name: "Alice Johnson", avatar: "/placeholder.svg?height=40&width=40", tier: "Pro", coins: 250 },
    { id: 2, name: "Bob Smith", avatar: "/placeholder.svg?height=40&width=40", tier: "Elite", coins: 1000 },
    { id: 3, name: "Charlie Brown", avatar: "/placeholder.svg?height=40&width=40", tier: "Basic", coins: 100 },
    // Add more creators as needed
]

const CreatorCard = ({ creator }) => (
    <Card className="bg-gray-800 text-white">
        <CardHeader className="flex flex-row items-center gap-4">
            <Avatar>
                <AvatarImage src={creator.avatar} alt={creator.name} />
                <AvatarFallback>{creator.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
                <CardTitle>{creator.name}</CardTitle>
                <CardDescription className="text-gray-400">{creator.tier} Tier</CardDescription>
            </div>
        </CardHeader>
        <CardContent>
            <div className="flex items-center text-yellow-400">
                <CoinsIcon className="mr-2 h-4 w-4" />
                <span>{creator.coins} coins available</span>
            </div>
        </CardContent>
        <CardFooter>

            <Link href={`/my-subscription/subscription/${creator.id}`} passHref>
                <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                    View Exclusive Content
                </Button>
            </Link>
        </CardFooter>
    </Card>
)

export default function SubscriberDashboard() {
    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                Your Subscriptions
            </h1>
            <ScrollArea className="h-[calc(100vh-200px)]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subscribedCreators.map(creator => (
                        <CreatorCard key={creator.id} creator={creator} />
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}