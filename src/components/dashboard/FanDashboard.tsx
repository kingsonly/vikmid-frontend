
'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
//import { MessageSquare, BookOpen, ShoppingBag, Calendar, CreditCard, Mail, LinkIcon, Users, Settings, Menu, X } from 'lucide-react'

export default function FanDashboard() {
    return (
        <Tabs defaultValue="mycontent" className="space-y-4">
            <TabsList className="bg-gray-800/80 backdrop-blur-xl p-1 rounded-lg border border-gray-700">
                <TabsTrigger
                    value="mycontent"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:via-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white rounded-md transition-colors"
                >
                    My Content
                </TabsTrigger>
                <TabsTrigger
                    value="discover"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:via-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white rounded-md transition-colors"
                >
                    Discover
                </TabsTrigger>
                <TabsTrigger
                    value="bookings"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:via-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white rounded-md transition-colors"
                >
                    My Bookings
                </TabsTrigger>
            </TabsList>

            <TabsContent value="mycontent" className="space-y-4">
                <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700 hover:border-purple-500/50 transition-colors">
                    <CardHeader>
                        <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">My Courses</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-gray-300">
                            <li className="p-2 rounded-lg hover:bg-gray-700 transition-colors">Advanced Web Development (50% complete)</li>
                            <li className="p-2 rounded-lg hover:bg-gray-700 transition-colors">Digital Marketing Fundamentals (80% complete)</li>
                        </ul>
                    </CardContent>
                </Card>
                <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700 hover:border-purple-500/50 transition-colors">
                    <CardHeader>
                        <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">My Purchases</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-gray-300">
                            <li className="p-2 rounded-lg hover:bg-gray-700 transition-colors">E-book: Mastering React</li>
                            <li className="p-2 rounded-lg hover:bg-gray-700 transition-colors">Productivity Planner Template</li>
                        </ul>
                    </CardContent>
                </Card>
                <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700 hover:border-purple-500/50 transition-colors">
                    <CardHeader>
                        <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">My Subscriptions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-gray-300">
                            <li className="p-2 rounded-lg hover:bg-gray-700 transition-colors">John Doe's Premium Content (Active)</li>
                            <li className="p-2 rounded-lg hover:bg-gray-700 transition-colors">Web Dev Weekly Newsletter (Active)</li>
                        </ul>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="discover" className="space-y-4">
                <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700 hover:border-purple-500/50 transition-colors">
                    <CardHeader>
                        <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">Recommended Courses</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-gray-300">
                            <li className="p-2 rounded-lg hover:bg-gray-700 transition-colors">Machine Learning Basics by Jane Smith</li>
                            <li className="p-2 rounded-lg hover:bg-gray-700 transition-colors">Advanced JavaScript Patterns by John Doe</li>
                        </ul>
                    </CardContent>
                </Card>
                <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700 hover:border-purple-500/50 transition-colors">
                    <CardHeader>
                        <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">Popular Creators</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-gray-300">
                            <li className="p-2 rounded-lg hover:bg-gray-700 transition-colors">Sarah Johnson (Fitness Expert)</li>
                            <li className="p-2 rounded-lg hover:bg-gray-700 transition-colors">Mike Thompson (Tech Reviewer)</li>
                        </ul>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="bookings" className="space-y-4">
                <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700 hover:border-purple-500/50 transition-colors">
                    <CardHeader>
                        <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">Upcoming Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-gray-300">
                            <li className="p-2 rounded-lg hover:bg-gray-700 transition-colors">Consultation call with John Doe (Tomorrow, 2 PM)</li>
                            <li className="p-2 rounded-lg hover:bg-gray-700 transition-colors">Group Coaching Session (Next Week, Monday 7 PM)</li>
                        </ul>
                    </CardContent>
                </Card>
                <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700 hover:border-purple-500/50 transition-colors">
                    <CardHeader>
                        <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">Book a Session</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4">
                            <div>
                                <Label htmlFor="creator" className="text-gray-300">Select Creator</Label>
                                <select id="creator" className="w-full mt-1 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500 transition-colors">
                                    <option>John Doe</option>
                                    <option>Jane Smith</option>
                                    <option>Mike Thompson</option>
                                </select>
                            </div>
                            <div>
                                <Label htmlFor="session-type" className="text-gray-300">Session Type</Label>
                                <select id="session-type" className="w-full mt-1 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500 transition-colors">
                                    <option>One-on-One Consultation</option>
                                    <option>Group Coaching</option>
                                    <option>Workshop</option>
                                </select>
                            </div>
                            <Button className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white hover:opacity-90 transition-opacity">
                                Check Availability
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    )
}