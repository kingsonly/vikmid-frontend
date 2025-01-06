'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Toast } from "@/components/ui/toast"
import { Trophy, Users, Coins, Clock } from 'lucide-react'

// Mock data for available contests
const availableContests = [
    { id: 1, name: "Photography Challenge", type: "Last Man Standing", entryFee: 50, participants: 120, totalPrize: 5000, startTime: "2025-01-15T15:00:00Z" },
    { id: 2, name: "Video Editing Showdown", type: "Last Bidder", entryFee: 100, participants: 75, totalPrize: 7500, startTime: "2025-01-16T18:00:00Z" },
    { id: 3, name: "Creative Writing Sprint", type: "Last Man Standing", entryFee: 25, participants: 200, totalPrize: 3000, startTime: "2025-01-17T20:00:00Z" },
]

const ContestCard = ({ contest, onRegister }: { contest: any, onRegister: any }) => {
    const startTime = new Date(contest.startTime)

    return (
        <Card className="bg-gray-800 text-white">
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    {contest.name}
                    <Badge variant="secondary" className="bg-pink-600 text-white">
                        {contest.type}
                    </Badge>
                </CardTitle>
                <CardDescription className="text-gray-400">
                    Entry Fee: {contest.entryFee} coins
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {contest.participants} participants
                    </div>
                    <div className="flex items-center">
                        <Trophy className="h-4 w-4 mr-1" />
                        {contest.totalPrize} coins prize
                    </div>
                    <div className="flex items-center col-span-2">
                        <Clock className="h-4 w-4 mr-1" />
                        Starts: {startTime.toLocaleString()}
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                    onClick={() => onRegister(contest)}
                >
                    Register
                </Button>
            </CardFooter>
        </Card>
    )
}

const RegistrationDialog = ({ contest, onConfirm, onCancel }: { contest: any, onConfirm: any, onCancel: any }) => (
    <DialogContent className="bg-gray-800 text-white">
        <DialogHeader>
            <DialogTitle>Register for {contest.name}</DialogTitle>
            <DialogDescription>
                You are about to register for this contest. Please confirm your participation.
            </DialogDescription>
        </DialogHeader>
        <div className="py-4">
            <p className="text-lg font-semibold">Contest Details:</p>
            <ul className="list-disc list-inside text-gray-300">
                <li>Type: {contest.type}</li>
                <li>Entry Fee: {contest.entryFee} coins</li>
                <li>Total Prize: {contest.totalPrize} coins</li>
                <li>Start Time: {new Date(contest.startTime).toLocaleString()}</li>
            </ul>
        </div>
        <DialogFooter>
            <Button variant="outline" onClick={onCancel}>Cancel</Button>
            <Button
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                onClick={() => onConfirm(contest)}
            >
                Confirm Registration
            </Button>
        </DialogFooter>
    </DialogContent>
)

export default function ContestList(params: any) {
    const { data } = params
    const [selectedContest, setSelectedContest] = useState(null)
    const handleRegister = (contest) => {
        setSelectedContest(contest)
    }

    const handleConfirmRegistration = (contest) => {
        // In a real application, this would send a request to the server to register the user
        Toast({
            title: "Registration Successful!",
            description: `You have successfully registered for "${contest.name}".`,
        })
        setSelectedContest(null)
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                Available Contests
            </h1>
            <ScrollArea className="h-[calc(100vh-200px)]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {availableContests.map(contest => (
                        <ContestCard
                            key={contest.id}
                            contest={contest}
                            onRegister={handleRegister}
                        />
                    ))}
                </div>
            </ScrollArea>

            <Dialog open={!!selectedContest} onOpenChange={() => setSelectedContest(null)}>
                {selectedContest && (
                    <RegistrationDialog
                        contest={selectedContest}
                        onConfirm={handleConfirmRegistration}
                        onCancel={() => setSelectedContest(null)}
                    />
                )}
            </Dialog>
        </div>
    )
}