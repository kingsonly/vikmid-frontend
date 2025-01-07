'use client'

import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Book, ShoppingBag, Award, Film, Phone, MessageCircle, CoinsIcon, PlayCircle } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

// Mock data for a creator's exclusive content
const creatorData = {
    id: 1,
    name: "Alice Johnson",
    avatar: "/placeholder.svg?height=100&width=100",
    tier: "Pro",
    coins: 250,
    courses: [
        { id: 1, title: "Advanced Photography", price: 50, discount: 20, description: "Master the art of professional photography with industry-leading techniques.", duration: "10 hours", lessons: 15 },
        { id: 2, title: "Video Editing Masterclass", price: 75, discount: 15, description: "Learn to edit videos like a pro using the latest software and techniques.", duration: "8 hours", lessons: 12 },
    ],
    products: [
        { id: 1, title: "Limited Edition Camera Strap", price: 30, discount: 10 },
        { id: 2, title: "Photography E-book Bundle", price: 25, discount: 20 },
    ],
    contests: [
        { id: 1, title: "Monthly Photo Challenge", entryFee: 5, description: "Show off your best shots in our monthly themed photo contest!", prize: "500 coins", endDate: "2025-01-31" },
        { id: 2, title: "Video Storytelling Contest", entryFee: 10, description: "Create a compelling 2-minute video story and win big!", prize: "1000 coins", endDate: "2025-02-15" },
    ],
    content: [
        { id: 1, title: "Behind the Scenes: Mountain Shoot", type: "video", duration: "15:30", thumbnail: "/placeholder.svg?height=180&width=320" },
        { id: 2, title: "Editing Tips and Tricks", type: "article", readTime: "5 min" },
    ],
    availableSlots: [
        { id: 1, date: "2025-01-15", time: "10:00 AM", price: 100, discount: 10 },
        { id: 2, date: "2025-01-17", time: "2:00 PM", price: 100, discount: 10 },
    ],
}

const CourseDialog = ({ course, onEnroll }) => (
    <Dialog>
        <DialogTrigger asChild>
            <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                View Details
            </Button>
        </DialogTrigger>
        <DialogContent className="bg-gray-800 text-white">
            <DialogHeader>
                <DialogTitle>{course.title}</DialogTitle>
                <DialogDescription className="text-gray-400">
                    {course.description}
                </DialogDescription>
            </DialogHeader>
            <div className="py-4">
                <p className="text-lg font-semibold">Course Details:</p>
                <ul className="list-disc list-inside text-gray-300">
                    <li>Duration: {course.duration}</li>
                    <li>Number of Lessons: {course.lessons}</li>
                    <li>Original Price: ${course.price}</li>
                    <li>Discount: {course.discount}% OFF</li>
                </ul>
            </div>
            <DialogFooter>
                <Button onClick={() => onEnroll(course)} className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                    Enroll Now for ${(course.price * (1 - course.discount / 100)).toFixed(2)}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
)

const ContestDialog = ({ contest, onEnter }) => (
    <Dialog>
        <DialogTrigger asChild>
            <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                View Details
            </Button>
        </DialogTrigger>
        <DialogContent className="bg-gray-800 text-white">
            <DialogHeader>
                <DialogTitle>{contest.title}</DialogTitle>
                <DialogDescription className="text-gray-400">
                    {contest.description}
                </DialogDescription>
            </DialogHeader>
            <div className="py-4">
                <p className="text-lg font-semibold">Contest Details:</p>
                <ul className="list-disc list-inside text-gray-300">
                    <li>Entry Fee: {contest.entryFee} coins</li>
                    <li>Prize: {contest.prize}</li>
                    <li>End Date: {contest.endDate}</li>
                </ul>
            </div>
            <DialogFooter>
                <Button onClick={() => onEnter(contest)} className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                    Enter Contest for {contest.entryFee} coins
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
)

const ContentDialog = ({ content }) => (
    <Dialog>
        <DialogTrigger asChild>
            <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                View {content.type === 'video' ? 'Video' : 'Article'}
            </Button>
        </DialogTrigger>
        <DialogContent className="bg-gray-800 text-white">
            <DialogHeader>
                <DialogTitle>{content.title}</DialogTitle>
            </DialogHeader>
            {content.type === 'video' ? (
                <div className="aspect-video bg-gray-700 flex items-center justify-center">
                    <PlayCircle className="h-16 w-16 text-white opacity-50" />
                </div>
            ) : (
                <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                    <p className="text-gray-300">
                        This is where the article content would go. It can be quite long, so we're using a ScrollArea to make it manageable.
                    </p>
                </ScrollArea>
            )}
        </DialogContent>
    </Dialog>
)

const CoursesArea = ({ courses }) => {
    const { toast } = useToast()
    const handleEnroll = (course) => {
        toast({
            title: "Enrolled Successfully!",
            description: `You have enrolled in "${course.title}". Check your courses dashboard to start learning.`,
        })
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map(course => (
                <Card key={course.id} className="bg-gray-800 text-white">
                    <CardHeader>
                        <CardTitle>{course.title}</CardTitle>
                        <CardDescription className="text-gray-400">
                            Original Price: ${course.price}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Badge variant="secondary" className="bg-green-600 text-white">
                            {course.discount}% OFF
                        </Badge>
                    </CardContent>
                    <CardFooter>
                        <CourseDialog course={course} onEnroll={handleEnroll} />
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}

const ContestsArea = ({ contests }) => {
    const { toast } = useToast()
    const handleEnterContest = (contest) => {
        toast({
            title: "Contest Entered!",
            description: `You have successfully entered "${contest.title}". Good luck!`,
        })
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contests.map(contest => (
                <Card key={contest.id} className="bg-gray-800 text-white">
                    <CardHeader>
                        <CardTitle>{contest.title}</CardTitle>
                        <CardDescription className="text-gray-400">
                            Entry Fee: {contest.entryFee} coins
                        </CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <ContestDialog contest={contest} onEnter={handleEnterContest} />
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}

const ContentArea = ({ content }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {content.map(item => (
            <Card key={item.id} className="bg-gray-800 text-white">
                <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription className="text-gray-400">
                        {item.type === 'video' ? `Duration: ${item.duration}` : `Read time: ${item.readTime}`}
                    </CardDescription>
                </CardHeader>
                {item.type === 'video' && (
                    <CardContent>
                        <div className="aspect-video bg-gray-700 rounded-md overflow-hidden">
                            <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                    </CardContent>
                )}
                <CardFooter>
                    <ContentDialog content={item} />
                </CardFooter>
            </Card>
        ))}
    </div>
)

const StoreArea = ({ products }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map(product => (
            <Card key={product.id} className="bg-gray-800 text-white">
                <CardHeader>
                    <CardTitle>{product.title}</CardTitle>
                    <CardDescription className="text-gray-400">
                        Original Price: ${product.price}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Badge variant="secondary" className="bg-green-600 text-white">
                        {product.discount}% OFF
                    </Badge>
                </CardContent>
                <CardFooter>
                    <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                        Add to Cart
                    </Button>
                </CardFooter>
            </Card>
        ))}
    </div>
)

const BookingArea = ({ availableSlots }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {availableSlots.map(slot => (
            <Card key={slot.id} className="bg-gray-800 text-white">
                <CardHeader>
                    <CardTitle>{slot.date}</CardTitle>
                    <CardDescription className="text-gray-400">
                        Time: {slot.time}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Badge variant="secondary" className="bg-green-600 text-white">
                        {slot.discount}% OFF
                    </Badge>
                </CardContent>
                <CardFooter>
                    <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                        Book Call
                    </Button>
                </CardFooter>
            </Card>
        ))}
    </div>
)

const MessagingArea = () => (
    <Card className="bg-gray-800 text-white">
        <CardHeader>
            <CardTitle>Real-time Chat</CardTitle>
            <CardDescription className="text-gray-400">
                Engage in live conversations and receive updates
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="h-64 bg-gray-700 rounded-md mb-4"></div>
        </CardContent>
        <CardFooter>
            <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                Open Chat
            </Button>
        </CardFooter>
    </Card>
)

export default function CreatorExclusiveContent() {
    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-20 w-20">
                    <AvatarImage src={creatorData.avatar} alt={creatorData.name} />
                    <AvatarFallback>{creatorData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                        {creatorData.name}'s Exclusive Content
                    </h1>
                    <p className="text-gray-400">{creatorData.tier} Tier</p>
                </div>
            </div>
            <div className="flex items-center mb-6 text-yellow-400">
                <CoinsIcon className="mr-2 h-6 w-6" />
                <span className="text-xl font-bold">{creatorData.coins} coins available</span>
            </div>

            <Tabs defaultValue="courses" className="space-y-4">
                <TabsList className="bg-gray-800 p-1 rounded-lg">
                    <TabsTrigger value="courses" className="data-[state=active]:bg-gray-700">
                        <Book className="mr-2 h-4 w-4" />
                        Courses
                    </TabsTrigger>
                    <TabsTrigger value="store" className="data-[state=active]:bg-gray-700">
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Store
                    </TabsTrigger>
                    <TabsTrigger value="contests" className="data-[state=active]:bg-gray-700">
                        <Award className="mr-2 h-4 w-4" />
                        Contests
                    </TabsTrigger>
                    <TabsTrigger value="content" className="data-[state=active]:bg-gray-700">
                        <Film className="mr-2 h-4 w-4" />
                        Content
                    </TabsTrigger>
                    <TabsTrigger value="booking" className="data-[state=active]:bg-gray-700">
                        <Phone className="mr-2 h-4 w-4" />
                        Booking
                    </TabsTrigger>
                    <TabsTrigger value="messaging" className="data-[state=active]:bg-gray-700">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Messaging
                    </TabsTrigger>
                </TabsList>

                <ScrollArea className="h-[calc(100vh-300px)]">
                    <TabsContent value="courses">
                        <CoursesArea courses={creatorData.courses} />
                    </TabsContent>

                    <TabsContent value="store">
                        <StoreArea products={creatorData.products} />
                    </TabsContent>

                    <TabsContent value="contests">
                        <ContestsArea contests={creatorData.contests} />
                    </TabsContent>

                    <TabsContent value="content">
                        <ContentArea content={creatorData.content} />
                    </TabsContent>

                    <TabsContent value="booking">
                        <BookingArea availableSlots={creatorData.availableSlots} />
                    </TabsContent>

                    <TabsContent value="messaging">
                        <MessagingArea />
                    </TabsContent>
                </ScrollArea>
            </Tabs>
        </div>
    )
}