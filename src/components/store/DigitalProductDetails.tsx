'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function DigitalProductDetails({ productData, onNext }) {
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData)
        onNext({ details: data })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {productData.type === 'digital-downloadable' ? (
                <div>
                    <Label htmlFor="downloadLink">Download Link</Label>
                    <Input id="downloadLink" name="downloadLink" type="url" required />
                </div>
            ) : (
                <div>
                    <Label htmlFor="accessInstructions">Access Instructions</Label>
                    <Textarea id="accessInstructions" name="accessInstructions" required />
                </div>
            )}
            <div>
                <Label htmlFor="fileSize">File Size (if applicable)</Label>
                <Input id="fileSize" name="fileSize" />
            </div>
            <div>
                <Label htmlFor="format">Format</Label>
                <Input id="format" name="format" placeholder="e.g., PDF, Video, Course" required />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-500">Next</Button>
        </form>
    )
}