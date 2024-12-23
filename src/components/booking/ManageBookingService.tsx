'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Calendar, Clock, DollarSign, Users, ArrowLeft, Edit2, X, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { Switch } from "@/components/ui/switch"

// Mock data for demonstration
const initialServiceDetails = {
    id: 1,
    title: 'Career Consultation',
    image: '/placeholder.svg?height=200&width=200',
    price: 50,
    duration: 30,
    description: 'Get expert advice on your career path',
    availability: [
        { day: 'Monday', slots: ['09:00', '10:00', '11:00', '14:00', '15:00'] },
        { day: 'Wednesday', slots: ['10:00', '11:00', '14:00', '15:00', '16:00'] },
        { day: 'Friday', slots: ['09:00', '10:00', '11:00', '13:00', '14:00'] },
    ]
}

const initialBookings = [
    { id: 1, client: 'John Doe', date: '2023-07-01', time: '10:00 AM', status: 'Upcoming' },
    { id: 2, client: 'Jane Smith', date: '2023-07-02', time: '2:00 PM', status: 'Upcoming' },
    { id: 3, client: 'Alice Johnson', date: '2023-06-30', time: '11:00 AM', status: 'Completed' },
    { id: 4, client: 'Bob Williams', date: '2023-06-29', time: '3:00 PM', status: 'Cancelled' },
    { id: 5, client: 'Charlie Brown', date: '2023-07-03', time: '1:00 PM', status: 'Upcoming' },
]

export default function ManageBookingService(props: any) {
    const [serviceDetails, setServiceDetails] = useState(initialServiceDetails)
    const [bookings, setBookings] = useState(initialBookings)
    const [isEditing, setIsEditing] = useState(false)
    const [activeTab, setActiveTab] = useState('basic')
    const { onBack } = props

    const handleSaveChanges = () => {
        setIsEditing(false)
        // Here you would typically send the updated serviceDetails to your backend
        console.log('Saving changes:', serviceDetails)
    }

    const handleCancelBooking = (bookingId) => {
        setBookings(bookings.map(booking =>
            booking.id === bookingId ? { ...booking, status: 'Cancelled' } : booking
        ))
        // Here you would typically send a cancellation request to your backend
        console.log('Cancelling booking:', bookingId)
    }

    const toggleAvailability = (day, time) => {
        setServiceDetails(prevDetails => {
            const updatedAvailability = prevDetails.availability.map(daySlot => {
                if (daySlot.day === day) {
                    if (daySlot.slots.includes(time)) {
                        return { ...daySlot, slots: daySlot.slots.filter(slot => slot !== time) }
                    } else {
                        return { ...daySlot, slots: [...daySlot.slots, time].sort() }
                    }
                }
                return daySlot
            })
            return { ...prevDetails, availability: updatedAvailability }
        })
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <Button onClick={onBack} variant="ghost" className="mb-4">
                <ArrowLeft className="mr-2" /> Back to Dashboard
            </Button>

            <Card className="bg-gray-800 mb-8">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-2xl font-bold">{serviceDetails.title}</CardTitle>
                    <Button onClick={() => setIsEditing(!isEditing)} variant="outline">
                        {isEditing ? 'Cancel Editing' : 'Edit Service'}
                    </Button>
                </CardHeader>
                <CardContent>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="basic">Basic Info</TabsTrigger>
                            <TabsTrigger value="availability">Availability</TabsTrigger>
                        </TabsList>
                        <TabsContent value="basic">
                            {isEditing ? (
                                <form onSubmit={(e) => { e.preventDefault(); handleSaveChanges(); }} className="space-y-4">
                                    <div>
                                        <Label htmlFor="title">Service Title</Label>
                                        <Input
                                            id="title"
                                            value={serviceDetails.title}
                                            onChange={(e) => setServiceDetails({ ...serviceDetails, title: e.target.value })}
                                            className="bg-gray-700"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            value={serviceDetails.description}
                                            onChange={(e) => setServiceDetails({ ...serviceDetails, description: e.target.value })}
                                            className="bg-gray-700"
                                        />
                                    </div>
                                    <div className="flex space-x-4">
                                        <div className="flex-1">
                                            <Label htmlFor="price">Price ($)</Label>
                                            <Input
                                                id="price"
                                                type="number"
                                                value={serviceDetails.price}
                                                onChange={(e) => setServiceDetails({ ...serviceDetails, price: Number(e.target.value) })}
                                                className="bg-gray-700"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <Label htmlFor="duration">Duration (minutes)</Label>
                                            <Input
                                                id="duration"
                                                type="number"
                                                value={serviceDetails.duration}
                                                onChange={(e) => setServiceDetails({ ...serviceDetails, duration: Number(e.target.value) })}
                                                className="bg-gray-700"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end space-x-2">
                                        <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                                        <Button type="submit">Save Changes</Button>
                                    </div>
                                </form>
                            ) : (
                                <div className="space-y-4">
                                    <Image src={serviceDetails.image} alt={serviceDetails.title} width={200} height={200} className="rounded-lg mb-4" />
                                    <p className="text-gray-400">{serviceDetails.description}</p>
                                    <div className="flex justify-between text-sm">
                                        <span className="flex items-center"><DollarSign className="w-4 h-4 mr-1" />${serviceDetails.price}</span>
                                        <span className="flex items-center"><Clock className="w-4 h-4 mr-1" />{serviceDetails.duration} min</span>
                                    </div>
                                </div>
                            )}
                        </TabsContent>
                        <TabsContent value="availability">
                            <div className="space-y-4">
                                {serviceDetails.availability.map((daySlot) => (
                                    <div key={daySlot.day} className="border border-gray-700 rounded-lg p-4">
                                        <h3 className="text-lg font-semibold mb-2">{daySlot.day}</h3>
                                        <div className="grid grid-cols-3 gap-2">
                                            {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'].map((time) => (
                                                <div key={time} className="flex items-center space-x-2">
                                                    <Switch
                                                        checked={daySlot.slots.includes(time)}
                                                        onCheckedChange={() => toggleAvailability(daySlot.day, time)}
                                                        disabled={!isEditing}
                                                    />
                                                    <span>{time}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            <h2 className="text-2xl font-bold mb-4">Booking History</h2>
            <Card className="bg-gray-800">
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Client</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Time</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bookings.map((booking) => (
                                <TableRow key={booking.id}>
                                    <TableCell>{booking.client}</TableCell>
                                    <TableCell>{booking.date}</TableCell>
                                    <TableCell>{booking.time}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs ${booking.status === 'Completed' ? 'bg-green-500' :
                                            booking.status === 'Upcoming' ? 'bg-blue-500' :
                                                'bg-red-500'
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        {booking.status === 'Upcoming' && (
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="destructive" size="sm">Cancel</Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent className="bg-gray-800">
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot be undone. This will permanently cancel the booking and notify the client.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleCancelBooking(booking.id)}>
                                                            Confirm Cancellation
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}