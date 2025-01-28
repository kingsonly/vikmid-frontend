"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { DollarSign, Users, ShoppingCart, Activity } from 'lucide-react'

const data = [
    { name: "Jan", total: Math.floor(Math.random() * 5000) },
    { name: "Feb", total: Math.floor(Math.random() * 5000) },
    { name: "Mar", total: Math.floor(Math.random() * 5000) },
    { name: "Apr", total: Math.floor(Math.random() * 5000) },
    { name: "May", total: Math.floor(Math.random() * 5000) },
    { name: "Jun", total: Math.floor(Math.random() * 5000) },
]

export default function CreatorDashboard() {
    return (
        <div className="space-y-6 bg-gray-900 text-white p-6 rounded-lg">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                Creator Dashboard
            </h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-200">Total Revenue</CardTitle>
                        <DollarSign className="w-4 h-4 text-green-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-400">$45,231.89</div>
                        <p className="text-xs text-gray-400">+20.1% from last month</p>
                    </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-200">Subscribers</CardTitle>
                        <Users className="w-4 h-4 text-blue-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-400">2,350</div>
                        <p className="text-xs text-gray-400">+180.1% from last month</p>
                    </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-200">Course Sales</CardTitle>
                        <ShoppingCart className="w-4 h-4 text-purple-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-purple-400">12,234</div>
                        <p className="text-xs text-gray-400">+19% from last month</p>
                    </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-200">Active Users</CardTitle>
                        <Activity className="w-4 h-4 text-yellow-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-yellow-400">573</div>
                        <p className="text-xs text-gray-400">+201 since last hour</p>
                    </CardContent>
                </Card>
            </div>
            <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                    <CardTitle className="text-gray-200">Revenue Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={data}>
                            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                            <Bar dataKey="total" fill="url(#colorGradient)" radius={[4, 4, 0, 0]} />
                            <defs>
                                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#ec4899" />
                                    <stop offset="100%" stopColor="#8b5cf6" />
                                </linearGradient>
                            </defs>
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    )
}