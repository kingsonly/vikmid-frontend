'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function ProductVariants({ onNext }) {
    const [variants, setVariants] = useState([{ color: '', size: '', price: '', image: '' }])

    const addVariant = () => {
        setVariants([...variants, { color: '', size: '', price: '', image: '' }])
    }

    const removeVariant = (index: number) => {
        setVariants(variants.filter((_, i) => i !== index))
    }

    const updateVariant = (index: number, field: string, value: string) => {
        const newVariants = [...variants]
        newVariants[index][field] = value
        setVariants(newVariants)
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        onNext({ variants })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence>
                {variants.map((variant, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="p-4 bg-gray-700 rounded-lg space-y-2"
                    >
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold">Variant {index + 1}</h3>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeVariant(index)}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <Label htmlFor={`color-${index}`}>Color</Label>
                                <Input
                                    id={`color-${index}`}
                                    value={variant.color}
                                    onChange={(e) => updateVariant(index, 'color', e.target.value)}
                                />
                            </div>
                            <div>
                                <Label htmlFor={`size-${index}`}>Size</Label>
                                <Input
                                    id={`size-${index}`}
                                    value={variant.size}
                                    onChange={(e) => updateVariant(index, 'size', e.target.value)}
                                />
                            </div>
                            <div>
                                <Label htmlFor={`price-${index}`}>Price</Label>
                                <Input
                                    id={`price-${index}`}
                                    type="number"
                                    value={variant.price}
                                    onChange={(e) => updateVariant(index, 'price', e.target.value)}
                                />
                            </div>
                            <div>
                                <Label htmlFor={`image-${index}`}>Image URL</Label>
                                <Input
                                    id={`image-${index}`}
                                    value={variant.image}
                                    onChange={(e) => updateVariant(index, 'image', e.target.value)}
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
            <Button type="button" onClick={addVariant} className="w-full" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Variant
            </Button>
            <Button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-500">Next</Button>
        </form>
    )
}