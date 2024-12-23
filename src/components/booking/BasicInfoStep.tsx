'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function BasicInfoStep({ onNext }) {
    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData)
        onNext({ basicInfo: data })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="title">Booking Title</Label>
                <Input id="title" name="title" required />
            </div>
            <div>
                <Label htmlFor="image">Booking Image URL</Label>
                <Input id="image" name="image" type="url" required />
            </div>
            <div>
                <Label htmlFor="description">Booking Description</Label>
                <Textarea id="description" name="description" required />
            </div>
            <div>
                <Label htmlFor="price">Booking Price</Label>
                <Input id="price" name="price" type="number" min="0" step="0.01" required />
            </div>
            <div>
                <Label htmlFor="duration">Call Duration</Label>
                <Select name="duration" required>
                    <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="10">10 minutes</SelectItem>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="20">20 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-500">Next</Button>
        </form>
    )
}