
'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
//import { MessageSquare, BookOpen, ShoppingBag, Calendar, CreditCard, Mail, LinkIcon, Users, Settings, Menu, X } from 'lucide-react'

export default function CreatorDashboard() {
    return (
        <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="bg-gray-800/80 backdrop-blur-xl p-1 rounded-lg border border-gray-700">
                <TabsTrigger
                    value="overview"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:via-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white rounded-md transition-colors"
                >
                    Overview
                </TabsTrigger>
                <TabsTrigger
                    value="content"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:via-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white rounded-md transition-colors"
                >
                    Content
                </TabsTrigger>
                <TabsTrigger
                    value="analytics"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:via-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white rounded-md transition-colors"
                >
                    Analytics
                </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700 hover:border-purple-500/50 transition-colors">
                        <CardHeader>
                            <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">Total Subscribers</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-bold text-white">1,234</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700 hover:border-purple-500/50 transition-colors">
                        <CardHeader>
                            <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">Total Revenue</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-bold text-white">₦2,345,678</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700 hover:border-purple-500/50 transition-colors">
                        <CardHeader>
                            <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">Active Courses</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-bold text-white">5</p>
                        </CardContent>
                    </Card>
                </div>
                <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700 hover:border-purple-500/50 transition-colors">
                    <CardHeader>
                        <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-gray-300">
                            <li className="p-2 rounded-lg hover:bg-gray-700 transition-colors">New subscriber: John Doe</li>
                            <li className="p-2 rounded-lg hover:bg-gray-700 transition-colors">Course purchase: "Advanced Web Development"</li>
                            <li className="p-2 rounded-lg hover:bg-gray-700 transition-colors">New booking: Consultation call with Jane Smith</li>
                        </ul>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="content" className="space-y-4">
                <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700 hover:border-purple-500/50 transition-colors">
                    <CardHeader>
                        <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">Create New Content</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4">
                            <div>
                                <Label htmlFor="content-type" className="text-gray-300">Content Type</Label>
                                <select id="content-type" className="w-full mt-1 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500 transition-colors">
                                    <option>Course</option>
                                    <option>Digital Product</option>
                                    <option>Blog Post</option>
                                </select>
                            </div>
                            <div>
                                <Label htmlFor="content-title" className="text-gray-300">Title</Label>
                                <Input
                                    id="content-title"
                                    placeholder="Enter title"
                                    className="bg-gray-700 border-gray-600 text-white focus:border-purple-500 transition-colors"
                                />
                            </div>
                            <div>
                                <Label htmlFor="content-description" className="text-gray-300">Description</Label>
                                <Textarea
                                    id="content-description"
                                    placeholder="Enter description"
                                    className="bg-gray-700 border-gray-600 text-white focus:border-purple-500 transition-colors"
                                />
                            </div>
                            <Button className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white hover:opacity-90 transition-opacity">
                                Create Content
                            </Button>
                        </form>
                    </CardContent>
                </Card>
                <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700 hover:border-purple-500/50 transition-colors">
                    <CardHeader>
                        <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">Your Content</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-gray-300">
                            <li className="p-2 rounded-lg hover:bg-gray-700 transition-colors">Advanced Web Development (Course)</li>
                            <li className="p-2 rounded-lg hover:bg-gray-700 transition-colors">E-book: Mastering React (Digital Product)</li>
                            <li className="p-2 rounded-lg hover:bg-gray-700 transition-colors">10 Tips for Successful Freelancing (Blog Post)</li>
                        </ul>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
                <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700 hover:border-purple-500/50 transition-colors">
                    <CardHeader>
                        <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">Revenue Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[200px] bg-gray-700 rounded-lg flex items-center justify-center text-gray-400">
                            [Revenue Chart Placeholder]
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700 hover:border-purple-500/50 transition-colors">
                    <CardHeader>
                        <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">Top Performing Content</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-gray-300">
                            <li className="p-2 rounded-lg hover:bg-gray-700 transition-colors">1. Advanced Web Development (Course) - ₦500,000</li>
                            <li className="p-2 rounded-lg hover:bg-gray-700 transition-colors">2. E-book: Mastering React (Digital Product) - ₦250,000</li>
                            <li className="p-2 rounded-lg hover:bg-gray-700 transition-colors">3. One-on-One Consultation (Booking) - ₦100,000</li>
                        </ul>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    )
}