'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Clock } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const TimeRangeSelector = ({ start, end, onChange, onRemove }) => {
    return (
        <div className="flex items-center space-x-2">
            <div className="relative">
                <Input
                    type="time"
                    value={start}
                    onChange={(e) => onChange('start', e.target.value)}
                    className="pl-8"
                />
                <Clock className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <span>to</span>
            <div className="relative">
                <Input
                    type="time"
                    value={end}
                    onChange={(e) => onChange('end', e.target.value)}
                    className="pl-8"
                />
                <Clock className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <Button type="button" variant="ghost" onClick={onRemove}>Remove</Button>
        </div>
    )
}

export function AvailabilityStep({ onNext }) {
    const { toast } = useToast()
    const [availability, setAvailability] = useState({})

    const handleDayChange = (day, isChecked) => {
        setAvailability(prev => ({
            ...prev,
            [day]: isChecked ? [{ start: '09:00', end: '17:00' }] : []
        }))
    }

    const handleTimeChange = (day, index, field, value) => {
        setAvailability(prev => {
            const updatedSlots = [...prev[day]]
            updatedSlots[index] = { ...updatedSlots[index], [field]: value }

            // Sort slots by start time
            updatedSlots.sort((a, b) => a.start.localeCompare(b.start))

            // Check for clashes
            for (let i = 0; i < updatedSlots.length - 1; i++) {
                if (updatedSlots[i].end > updatedSlots[i + 1].start) {
                    toast({
                        title: "Time Clash Detected",
                        description: "Please ensure time slots don't overlap.",
                        variant: "destructive",
                    })
                    return prev // Return previous state if there's a clash
                }
            }

            return { ...prev, [day]: updatedSlots }
        })
    }

    const addTimeSlot = (day) => {
        setAvailability(prev => {
            const lastSlot = prev[day][prev[day].length - 1]
            const newStart = lastSlot.end
            let newEnd = incrementTime(newStart, 60) // Default to 1 hour later

            // Ensure the new slot doesn't go past midnight
            if (newEnd < newStart) {
                newEnd = '23:59'
            }

            return {
                ...prev,
                [day]: [...prev[day], { start: newStart, end: newEnd }]
            }
        })
    }

    const removeTimeSlot = (day, index) => {
        setAvailability(prev => ({
            ...prev,
            [day]: prev[day].filter((_, i) => i !== index)
        }))
    }

    const incrementTime = (time, minutes) => {
        const [hours, mins] = time.split(':').map(Number)
        const date = new Date(2000, 0, 1, hours, mins + minutes)
        return date.toTimeString().slice(0, 5)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        onNext({ availability })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {days.map(day => (
                <div key={day} className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id={day}
                            checked={availability[day]?.length > 0}
                            onCheckedChange={(checked) => handleDayChange(day, checked)}
                        />
                        <Label htmlFor={day}>{day}</Label>
                    </div>
                    {availability[day]?.map((slot, index) => (
                        <TimeRangeSelector
                            key={index}
                            start={slot.start}
                            end={slot.end}
                            onChange={(field, value) => handleTimeChange(day, index, field, value)}
                            onRemove={() => removeTimeSlot(day, index)}
                        />
                    ))}
                    {availability[day]?.length > 0 && (
                        <Button type="button" variant="outline" onClick={() => addTimeSlot(day)}>Add Time Slot</Button>
                    )}
                </div>
            ))}
            <Button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-500">Next</Button>
        </form>
    )
}