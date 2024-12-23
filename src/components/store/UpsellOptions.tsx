'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function UpsellOptions({ onNext }) {
    const [upsells, setUpsells] = useState([{ product: '', price: '' }])

    const addUpsell = () => {
        setUpsells([...upsells, { product: '', price: '' }])
    }

    const removeUpsell = (index: number) => {
        setUpsells(upsells.filter((_, i) => i !== index))
    }

    const updateUpsell = (index: number, field: string, value: string) => {
        const newUpsells = [...upsells]
        newUpsells[index][field] = value
        setUpsells(newUpsells)
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        onNext({ upsells })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence>
                {upsells.map((upsell, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="p-4 bg-gray-700 rounded-lg space-y-2"
                    >
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold">Upsell Option {index + 1}</h3>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeUpsell(index)}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <Label htmlFor={`product-${index}`}>Product Name</Label>
                                <Input
                                    id={`product-${index}`}
                                    value={upsell.product}
                                    onChange={(e) => updateUpsell(index, 'product', e.target.value)}
                                />
                            </div>
                            <div>
                                <Label htmlFor={`price-${index}`}>Price</Label>
                                <Input
                                    id={`price-${index}`}
                                    type="number"
                                    value={upsell.price}
                                    onChange={(e) => updateUpsell(index, 'price', e.target.value)}
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
            <Button type="button" onClick={addUpsell} className="w-full" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Upsell Option
            </Button>
            <Button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-500">Next</Button>
        </form>
    )
}