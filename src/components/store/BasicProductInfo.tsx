'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function BasicProductInfo({ productData, onNext }) {
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData)
        onNext({ basicInfo: data })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" name="name" required />
            </div>
            <div>
                <Label htmlFor="description">Product Description</Label>
                <Textarea id="description" name="description" required />
            </div>
            <div>
                <Label htmlFor="price">Price</Label>
                <Input id="price" name="price" type="number" min="0" step="0.01" required />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-500">Next</Button>
        </form>
    )
}