'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function PhysicalProductDetails({ onNext }) {
    const handleSubmit = (event: React.FormEvent) => {   event.preventDefault()
        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData)
        onNext({ details: data })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="weight">Weight (in kg)</Label>
                <Input id="weight" name="weight" type="number" step="0.01" required />
            </div>
            <div>
                <Label htmlFor="dimensions">Dimensions (L x W x H in cm)</Label>
                <Input id="dimensions" name="dimensions" placeholder="e.g., 10 x 5 x 2" required />
            </div>
            <div>
                <Label htmlFor="shippingNotes">Shipping Notes</Label>
                <Textarea id="shippingNotes" name="shippingNotes" />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-500">Next</Button>
        </form>
    )
}