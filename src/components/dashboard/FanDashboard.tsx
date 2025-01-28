"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Book, Calendar, CreditCard, Award } from 'lucide-react'

export default function FanDashboard() {
    return (
        <div className="space-y-6 bg-gray-900 text-white p-6 rounded-lg">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                Fan Dashboard
            </h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-200">Courses in Progress</CardTitle>
                        <Book className="w-4 h-4 text-blue-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-400">4</div>
                        <Progress value={33} className="mt-2 bg-gray-700" />
                        <p className="text-xs text-gray-400 mt-2">2 courses completed</p>
                    </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-200">Upcoming Bookings</CardTitle>
                        <Calendar className="w-4 h-4 text-green-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-400">3</div>
                        <p className="text-xs text-gray-400">Next: Creative Writing Workshop (Tomorrow, 2 PM)</p>
                    </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-200">Active Subscriptions</CardTitle>
                        <CreditCard className="w-4 h-4 text-purple-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-purple-400">2</div>
                        <p className="text-xs text-gray-400">Premium & Pro Creator Access</p>
                    </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-200">Achievements</CardTitle>
                        <Award className="w-4 h-4 text-yellow-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-yellow-400">7</div>
                        <p className="text-xs text-gray-400">2 new this month</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}