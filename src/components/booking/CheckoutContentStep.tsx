'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function CheckoutContentStep({ onNext }) {
    const [fields, setFields] = useState([
        { name: 'name', type: 'text', required: true },
        { name: 'email', type: 'email', required: true }
    ])

    const addField = () => {
        setFields([...fields, { name: '', type: 'text', required: false }])
    }

    const removeField = (index) => {
        setFields(fields.filter((_, i) => i !== index))
    }

    const updateField = (index, key, value) => {
        const newFields = [...fields]
        newFields[index][key] = value
        setFields(newFields)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        onNext({ checkoutContent: fields })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {fields.map((field, index) => (
                <div key={index} className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <Input
                            value={field.name}
                            onChange={(e) => updateField(index, 'name', e.target.value)}
                            placeholder="Field name"
                        />
                        <Select
                            value={field.type}
                            onValueChange={(value) => updateField(index, 'type', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Field type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="text">Text</SelectItem>
                                <SelectItem value="email">Email</SelectItem>
                                <SelectItem value="tel">Phone</SelectItem>
                                <SelectItem value="number">Number</SelectItem>
                            </SelectContent>
                        </Select>
                        <Label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={field.required}
                                onChange={(e) => updateField(index, 'required', e.target.checked)}
                            />
                            <span>Required</span>
                        </Label>
                        <Button type="button" variant="ghost" onClick={() => removeField(index)}>Remove</Button>
                    </div>
                </div>
            ))}
            <Button type="button" variant="outline" onClick={addField}>Add Field</Button>
            <Button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-500">Submit</Button>
        </form>
    )
}