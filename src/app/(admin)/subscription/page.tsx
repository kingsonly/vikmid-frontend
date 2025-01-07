'use client'

import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CoinsIcon, DollarSign, Users, BarChart2, Plus, Edit, Trash2, Eye, ImageIcon, TrendingUp, Award } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import Image from 'next/image'

// Mock data for demonstration
const initialSubscriptionTiers = [
    { id: 1, name: 'Basic', price: 9.99, coins: 100, image: '/placeholder.svg?height=100&width=100', perks: ['Access to exclusive content', 'Participate in basic contests'], subscribers: 500, revenue: 4995, contestEntries: 1500, growth: 5, retention: 85 },
    { id: 2, name: 'Pro', price: 19.99, coins: 250, image: '/placeholder.svg?height=100&width=100', perks: ['All Basic features', 'Priority support', 'Participate in premium contests'], subscribers: 300, revenue: 5997, contestEntries: 2250, growth: 8, retention: 92 },
    { id: 3, name: 'Elite', price: 49.99, coins: 1000, image: '/placeholder.svg?height=100&width=100', perks: ['All Pro features', 'One-on-one mentoring', 'Unlimited contest entries'], subscribers: 100, revenue: 4999, contestEntries: 5000, growth: 12, retention: 97 },
]

const SubscriptionTierCard = ({ tier, onEdit, onDelete, onViewDetails }) => (
    <Card className="bg-gray-800 text-white overflow-hidden">
        <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-bold">{tier.name}</CardTitle>
                <Badge variant="secondary" className="bg-purple-600 text-white">
                    ${tier.price.toFixed(2)} / month
                </Badge>
            </div>
        </CardHeader>
        <CardContent className="pt-2">
            <div className="relative h-32 mb-4 overflow-hidden rounded-md">
                <Image src={tier.image} alt={tier.name} layout="fill" objectFit="cover" className="transition-transform duration-300 hover:scale-110" />
            </div>
            <div className="flex items-center mb-4 text-yellow-400">
                <CoinsIcon className="mr-2 h-4 w-4" />
                <span>{tier.coins} coins per month</span>
            </div>
            <ul className="list-disc list-inside text-gray-300 mb-4">
                {tier.perks.map((perk, index) => (
                    <li key={index} className="text-sm">{perk}</li>
                ))}
            </ul>
        </CardContent>
        <CardFooter className="flex justify-between bg-gray-700 py-2">
            <Button variant="ghost" onClick={() => onViewDetails(tier)} className="hover:bg-gray-600">
                <Eye className="mr-2 h-4 w-4" />
                View Details
            </Button>
            <Button variant="ghost" onClick={() => onEdit(tier)} className="hover:bg-gray-600">
                <Edit className="mr-2 h-4 w-4" />
                Edit
            </Button>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="ghost" className="hover:bg-red-600 hover:text-white">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-gray-800 text-white">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to delete this tier?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the {tier.name} tier and remove all associated data.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="bg-gray-700 text-white hover:bg-gray-600">Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => onDelete(tier.id)} className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </CardFooter>
    </Card>
)

const SubscriptionTierForm = ({ tier, onSave, onCancel }) => {
    const [formData, setFormData] = useState(tier ? {
        name: tier.name || '',
        price: tier.price || 0,
        coins: tier.coins || 0,
        image: tier.image || '',
        perks: tier.perks || ['']
    } : { name: '', price: 0, coins: 0, image: '', perks: [''] })

    const handleSubmit = (e) => {
        e.preventDefault()
        onSave(formData)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="name" className="text-white">Tier Name</Label>
                <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-gray-700 text-white"
                />
            </div>
            <div>
                <Label htmlFor="price" className="text-white">Price ($ per month)</Label>
                <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    required
                    className="bg-gray-700 text-white"
                />
            </div>
            <div>
                <Label htmlFor="coins" className="text-white">Coins per month</Label>
                <Input
                    id="coins"
                    type="number"
                    value={formData.coins}
                    onChange={(e) => setFormData({ ...formData, coins: parseInt(e.target.value) })}
                    required
                    className="bg-gray-700 text-white"
                />
            </div>
            <div>
                <Label htmlFor="image" className="text-white">Image URL</Label>
                <Input
                    id="image"
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    required
                    className="bg-gray-700 text-white"
                />
            </div>
            <div>
                <Label className="text-white">Perks</Label>
                {formData.perks.map((perk, index) => (
                    <div key={index} className="flex items-center mt-2">
                        <Input
                            value={perk}
                            onChange={(e) => {
                                const newPerks = [...formData.perks]
                                newPerks[index] = e.target.value
                                setFormData({ ...formData, perks: newPerks })
                            }}
                            className="bg-gray-700 text-white"
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setFormData({ ...formData, perks: formData.perks.filter((_, i) => i !== index) })}
                            className="ml-2 text-red-400 hover:text-red-300"
                        >
                            Remove
                        </Button>
                    </div>
                ))}
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => setFormData({ ...formData, perks: [...formData.perks, ''] })}
                    className="mt-2 bg-gray-700 hover:bg-gray-600"
                >
                    Add Perk
                </Button>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
                <Button type="button" variant="outline" onClick={onCancel} className="bg-gray-700 hover:bg-gray-600">
                    Cancel
                </Button>
                <Button type="submit" className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                    Save
                </Button>
            </div>
        </form>
    )
}

const TierDetailsDialog = ({ tier, onClose }) => (
    <DialogContent className="bg-gray-800 text-white max-w-4xl">
        <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{tier.name} Tier Details</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-gray-700">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                        <Users className="mr-2 h-5 w-5 text-blue-400" />
                        Subscriber Information
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span>Total Subscribers:</span>
                            <span className="font-bold text-blue-400">{tier.subscribers}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span>Monthly Revenue:</span>
                            <span className="font-bold text-green-400">${tier.revenue.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span>Growth Rate:</span>
                            <span className="font-bold text-purple-400">{tier.growth}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span>Retention Rate:</span>
                            <span className="font-bold text-yellow-400">{tier.retention}%</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="bg-gray-700">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                        <Award className="mr-2 h-5 w-5 text-yellow-400" />
                        Contest Participation
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span>Total Contest Entries:</span>
                            <span className="font-bold text-yellow-400">{tier.contestEntries}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span>Avg. Entries per Subscriber:</span>
                            <span className="font-bold text-yellow-400">{(tier.contestEntries / tier.subscribers).toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span>Contest Participation Rate:</span>
                            <span className="font-bold text-yellow-400">{((tier.contestEntries / tier.subscribers) * 100).toFixed(2)}%</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
        <Card className="bg-gray-700 mt-4">
            <CardHeader>
                <CardTitle className="text-lg flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5 text-green-400" />
                    Recent Activity
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[200px]">
                    <ul className="space-y-2">
                        {[...Array(10)].map((_, index) => (
                            <li key={index} className="flex items-center justify-between text-sm">
                                <span>{['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Brown', 'Charlie Davis'][index % 5]}</span>
                                <span className="text-gray-400">{['Subscribed', 'Renewed subscription', 'Participated in contest', 'Won contest', 'Upgraded tier'][index % 5]} {index + 1} day{index !== 0 ? 's' : ''} ago</span>
                            </li>
                        ))}
                    </ul>
                </ScrollArea>
            </CardContent>
        </Card>
    </DialogContent>
)

export default function SubscriptionManagement() {
    const [subscriptionTiers, setSubscriptionTiers] = useState(initialSubscriptionTiers)
    const [editingTier, setEditingTier] = useState<any>(null)
    const [viewingTierDetails, setViewingTierDetails] = useState<any>(null)

    const handleSaveTier = (tierData) => {
        if (tierData.id) {
            setSubscriptionTiers(subscriptionTiers.map(tier => tier.id === tierData.id ? { ...tier, ...tierData } : tier))
        } else {
            setSubscriptionTiers([...subscriptionTiers, { ...tierData, id: Date.now(), subscribers: 0, revenue: 0, contestEntries: 0, growth: 0, retention: 0 }])
        }
        setEditingTier(null)
    }

    const handleDeleteTier = (tierId) => {
        setSubscriptionTiers(subscriptionTiers.filter(tier => tier.id !== tierId))
    }

    return (
        <div className="min-h-screen w-full bg-gray-900 text-white p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">Subscription Management</h1>
                <Button onClick={() => setEditingTier({})} className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Tier
                </Button>
            </div>

            <Tabs defaultValue="tiers" className="space-y-4">
                <TabsList className="bg-gray-800 p-1 rounded-lg">
                    <TabsTrigger value="tiers" className="data-[state=active]:bg-gray-700">Subscription Tiers</TabsTrigger>
                    <TabsTrigger value="analytics" className="data-[state=active]:bg-gray-700">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="tiers">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {subscriptionTiers.map(tier => (
                            <SubscriptionTierCard
                                key={tier.id}
                                tier={tier}
                                onEdit={() => setEditingTier(tier)}
                                onDelete={handleDeleteTier}
                                onViewDetails={() => setViewingTierDetails(tier)}
                            />
                        ))}
                    </div>

                    <Dialog open={editingTier !== null} onOpenChange={() => setEditingTier(null)}>
                        <DialogContent className="bg-gray-800 text-white">
                            <DialogHeader>
                                <DialogTitle>{editingTier?.id ? 'Edit' : 'Add'} Subscription Tier</DialogTitle>
                            </DialogHeader>
                            {editingTier !== null && (
                                <SubscriptionTierForm
                                    tier={editingTier}
                                    onSave={handleSaveTier}
                                    onCancel={() => setEditingTier(null)}
                                />
                            )}
                        </DialogContent>
                    </Dialog>

                    <Dialog open={viewingTierDetails !== null} onOpenChange={() => setViewingTierDetails(null)}>
                        {viewingTierDetails && <TierDetailsDialog tier={viewingTierDetails} onClose={() => setViewingTierDetails(null)} />}
                    </Dialog>
                </TabsContent>

                <TabsContent value="analytics">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Card className="bg-gray-800">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold flex items-center">
                                    <Users className="mr-2 h-5 w-5 text-blue-400" />
                                    Total Subscribers
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-blue-400">
                                    {subscriptionTiers.reduce((sum, tier) => sum + tier.subscribers, 0)}
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-gray-800">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold flex items-center">
                                    <DollarSign className="mr-2 h-5 w-5 text-green-400" />
                                    Monthly Revenue
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-green-400">
                                    ${subscriptionTiers.reduce((sum, tier) => sum + tier.revenue, 0).toFixed(2)}
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-gray-800">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold flex items-center">
                                    <Award className="mr-2 h-5 w-5 text-yellow-400" />
                                    Total Contest Entries
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-yellow-400">
                                    {subscriptionTiers.reduce((sum, tier) => sum + tier.contestEntries, 0)}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <Card className="mt-4 bg-gray-800">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold flex items-center">
                                <BarChart2 className="mr-2 h-5 w-5 text-purple-400" />
                                Subscription Growth
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] w-full">
                                {/* Placeholder for actual chart component */}
                                <div className="flex items-center justify-center h-full text-gray-500">
                                    Chart placeholder: Subscription growth over time
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}