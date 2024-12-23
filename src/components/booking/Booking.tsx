'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Clock, DollarSign, Users, BarChart } from 'lucide-react'
import Image from 'next/image'
import { NewBookingWizard } from './NewBookingWizard'
import ManageBookingService from './ManageBookingService'

// Mock data for demonstration
const bookingServices = [
    { id: 1, title: 'Career Consultation', image: '/placeholder.svg?height=200&width=200', price: 50, duration: 30, description: 'Get expert advice on your career path' },
    { id: 2, title: 'Portfolio Review', image: '/placeholder.svg?height=200&width=200', price: 75, duration: 45, description: 'Have your portfolio reviewed by a professional' },
    { id: 3, title: 'Mock Interview', image: '/placeholder.svg?height=200&width=200', price: 60, duration: 60, description: 'Practice your interview skills with real-time feedback' },
]

const callHistory = [
    { id: 1, service: 'Career Consultation', client: 'John Doe', date: '2023-06-15', time: '10:00 AM', status: 'Completed' },
    { id: 2, service: 'Portfolio Review', client: 'Jane Smith', date: '2023-06-16', time: '2:00 PM', status: 'Upcoming' },
    { id: 3, service: 'Mock Interview', client: 'Alice Johnson', date: '2023-06-17', time: '11:00 AM', status: 'Cancelled' },
    { id: 4, service: 'Career Consultation', client: 'Bob Williams', date: '2023-06-18', time: '3:00 PM', status: 'Upcoming' },
    { id: 5, service: 'Portfolio Review', client: 'Charlie Brown', date: '2023-06-19', time: '1:00 PM', status: 'Upcoming' },
]

export default function Booking() {
    const [isCreatingNewBooking, setIsCreatingNewBooking] = useState(false)
    const [manageBookingService, setManageBookingService] = useState(false)

    const upcomingCalls = callHistory.filter(call => call.status === 'Upcoming').length
    const completedCalls = callHistory.filter(call => call.status === 'Completed').length
    const onClickManage = () => {
        setManageBookingService(true)
    }
    const render = () => {
        if (manageBookingService) {
            return <div>
                <ManageBookingService onBack={() => setManageBookingService(false)} />
            </div>
        }
        return (
            <div className="min-h-screen bg-gray-900 text-white p-8">
                <h1 className="text-3xl font-bold mb-8">Booking Dashboard</h1>

                {isCreatingNewBooking ? (
                    <NewBookingWizard onCancel={() => setIsCreatingNewBooking(false)} />
                ) : (
                    <>
                        <Button
                            onClick={() => setIsCreatingNewBooking(true)}
                            className="mb-8 bg-gradient-to-r from-pink-500 to-purple-500"
                        >
                            Create New Booking
                        </Button>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                            <Card className="bg-gray-800">
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Calendar className="mr-2" />
                                        Upcoming Calls
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-4xl font-bold">{upcomingCalls}</p>
                                </CardContent>
                            </Card>

                            <Card className="bg-gray-800">
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <BarChart className="mr-2" />
                                        Completed Calls
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-4xl font-bold">{completedCalls}</p>
                                </CardContent>
                            </Card>

                            <Card className="bg-gray-800">
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <DollarSign className="mr-2" />
                                        Total Earnings
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-4xl font-bold">${completedCalls * 50}</p>
                                </CardContent>
                            </Card>
                        </div>

                        <h2 className="text-2xl font-bold mb-4">Your Booking Services</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                            {bookingServices.map((service) => (
                                <Card key={service.id} className="bg-gray-800">
                                    <CardHeader>
                                        <Image src={service.image} alt={service.title} width={200} height={200} className="rounded-lg mb-4" />
                                        <CardTitle>{service.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-400 mb-2">{service.description}</p>
                                        <div className="flex justify-between text-sm">
                                            <span className="flex items-center"><DollarSign className="w-4 h-4 mr-1" />${service.price}</span>
                                            <span className="flex items-center"><Clock className="w-4 h-4 mr-1" />{service.duration} min</span>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button onClick={() => onClickManage()} className="w-full bg-gradient-to-r from-pink-500 to-purple-500">Manage</Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>

                        <h2 className="text-2xl font-bold mb-4">Call History</h2>
                        <Card className="bg-gray-800">
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Service</TableHead>
                                            <TableHead>Client</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Time</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {callHistory.map((call) => (
                                            <TableRow key={call.id}>
                                                <TableCell>{call.service}</TableCell>
                                                <TableCell>{call.client}</TableCell>
                                                <TableCell>{call.date}</TableCell>
                                                <TableCell>{call.time}</TableCell>
                                                <TableCell>
                                                    <span className={`px-2 py-1 rounded-full text-xs ${call.status === 'Completed' ? 'bg-green-500' :
                                                        call.status === 'Upcoming' ? 'bg-blue-500' :
                                                            'bg-red-500'
                                                        }`}>
                                                        {call.status}
                                                    </span>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </>
                )}
            </div>
        )
    }
    return render()
}