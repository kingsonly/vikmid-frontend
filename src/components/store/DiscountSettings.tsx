'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function DiscountSettings({ onNext }) {
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData)
        onNext({ discounts: data })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center justify-between">
                <Label htmlFor="enable-discount">Enable Discount</Label>
                <Switch id="enable-discount" name="enableDiscount" />
            </div>
            <div>
                <Label htmlFor="original-price">Original Price</Label>
                <Input id="original-price" name="originalPrice" type="number" step="0.01" />
            </div>
            <div>
                <Label htmlFor="discounted-price">Discounted Price</Label>
                <Input id="discounted-price" name="discountedPrice" type="number" step="0.01" />
            </div>
            <div>
                <Label htmlFor="discount-start">Discount Start Date</Label>
                <Input id="discount-start" name="discountStart" type="date" />
            </div>
            <div>
                <Label htmlFor="discount-end">Discount End Date</Label>
                <Input id="discount-end" name="discountEnd" type="date" />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-500">Create Product</Button>
        </form>
    )
}