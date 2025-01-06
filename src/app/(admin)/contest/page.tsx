'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit, Trash2, Users, Coins, Trophy } from 'lucide-react'
//import { toast } from "@/components/ui/use-toast"

// Mock data for existing contests
const mockContests = [
    { id: 1, name: "Photography Challenge", type: "Standalone", entryFee: 50, participants: 120, totalPrize: 5000 },
    { id: 2, name: "Video Editing Showdown", type: "Course", entryFee: 0, participants: 75, totalPrize: 3000 },
    { id: 3, name: "Monthly Creative Contest", type: "Subscription", entryFee: 100, participants: 200, totalPrize: 10000 },
    { id: 4, name: "Ultimate Creator Challenge", type: "Hybrid", entryFee: 200, participants: 50, totalPrize: 15000 },
]

const ContestCard = ({ contest, onEdit, onDelete }) => (
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
            <div className="flex justify-between text-sm">
                <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {contest.participants} participants
                </div>
                <div className="flex items-center">
                    <Trophy className="h-4 w-4 mr-1" />
                    {contest.totalPrize} coins prize pool
                </div>
            </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(contest)}>
                <Edit className="h-4 w-4 mr-1" /> Edit
            </Button>
            <Button variant="destructive" size="sm" onClick={() => onDelete(contest.id)}>
                <Trash2 className="h-4 w-4 mr-1" /> Delete
            </Button>
        </CardFooter>
    </Card>
)

const CreateContestForm = ({ onSubmit, initialData = null }) => {
    const [formData, setFormData] = useState(initialData || {
        name: '',
        type: 'Standalone',
        entryFee: 0,
        totalPrize: 0,
        description: '',
        isCoinsRequired: false,
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(formData)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="name">Contest Name</Label>
                <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-gray-700 text-white border-gray-600"
                    required
                />
            </div>
            <div>
                <Label htmlFor="type">Contest Type</Label>
                <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                >
                    <SelectTrigger className="bg-gray-700 text-white border-gray-600">
                        <SelectValue placeholder="Select contest type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Standalone">Standalone</SelectItem>
                        <SelectItem value="Course">Course-attached</SelectItem>
                        <SelectItem value="Subscription">Subscription-attached</SelectItem>
                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex items-center space-x-2">
                <Switch
                    id="coins-required"
                    checked={formData.isCoinsRequired}
                    onCheckedChange={(checked) => setFormData({ ...formData, isCoinsRequired: checked })}
                />
                <Label htmlFor="coins-required">Require Coins for Entry</Label>
            </div>
            {formData.isCoinsRequired && (
                <div>
                    <Label htmlFor="entryFee">Entry Fee (coins)</Label>
                    <Input
                        id="entryFee"
                        type="number"
                        value={formData.entryFee}
                        onChange={(e) => setFormData({ ...formData, entryFee: parseInt(e.target.value) })}
                        className="bg-gray-700 text-white border-gray-600"
                        min="0"
                    />
                </div>
            )}
            <div>
                <Label htmlFor="totalPrize">Total Prize Pool (coins)</Label>
                <Input
                    id="totalPrize"
                    type="number"
                    value={formData.totalPrize}
                    onChange={(e) => setFormData({ ...formData, totalPrize: parseInt(e.target.value) })}
                    className="bg-gray-700 text-white border-gray-600"
                    min="0"
                />
            </div>
            <div>
                <Label htmlFor="description">Contest Description</Label>
                <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="bg-gray-700 text-white border-gray-600"
                    rows={4}
                />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                {initialData ? 'Update Contest' : 'Create Contest'}
            </Button>
        </form>
    )
}

export default function ContestManagement() {
    const [contests, setContests] = useState(mockContests)
    const [editingContest, setEditingContest] = useState(null)

    const handleCreateContest = (newContest) => {
        setContests([...contests, { ...newContest, id: contests.length + 1, participants: 0 }])
        // toast({
        //     title: "Contest Created",
        //     description: `"${newContest.name}" has been successfully created.`,
        // })
    }

    const handleEditContest = (updatedContest) => {
        setContests(contests.map(contest =>
            contest.id === updatedContest.id ? { ...contest, ...updatedContest } : contest
        ))
        setEditingContest(null)
        // toast({
        //     title: "Contest Updated",
        //     description: `"${updatedContest.name}" has been successfully updated.`,
        // })
    }

    const handleDeleteContest = (id) => {
        setContests(contests.filter(contest => contest.id !== id))
        // toast({
        //     title: "Contest Deleted",
        //     description: "The contest has been successfully deleted.",
        //     variant: "destructive",
        // })
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                Contest Management
            </h1>

            <Tabs defaultValue="active" className="space-y-4">
                <TabsList className="bg-gray-800 p-1 rounded-lg">
                    <TabsTrigger value="active" className="data-[state=active]:bg-gray-700">Active Contests</TabsTrigger>
                    <TabsTrigger value="create" className="data-[state=active]:bg-gray-700">Create Contest</TabsTrigger>
                </TabsList>

                <TabsContent value="active">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {contests.map(contest => (
                            <ContestCard
                                key={contest.id}
                                contest={contest}
                                onEdit={setEditingContest}
                                onDelete={handleDeleteContest}
                            />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="create">
                    <Card className="bg-gray-800">
                        <CardHeader>
                            <CardTitle>Create New Contest</CardTitle>
                            <CardDescription>Set up a new contest for your audience</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <CreateContestForm onSubmit={handleCreateContest} />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <Dialog open={!!editingContest} onOpenChange={() => setEditingContest(null)}>
                <DialogContent className="bg-gray-800 text-white">
                    <DialogHeader>
                        <DialogTitle>Edit Contest</DialogTitle>
                        <DialogDescription>
                            Make changes to your contest here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <CreateContestForm
                        initialData={editingContest}
                        onSubmit={handleEditContest}
                    />
                </DialogContent>
            </Dialog>
        </div>
    )
}