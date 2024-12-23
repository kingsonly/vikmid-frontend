'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Package, Download, File, ShoppingBag } from 'lucide-react'

export function ProductTypeSelector({ onNext }) {
    const productTypes = [
        { type: 'physical', icon: ShoppingBag, label: 'Physical Product' },
        { type: 'digital-downloadable', icon: Download, label: 'Downloadable Digital Product' },
        { type: 'digital-non-downloadable', icon: File, label: 'Non-Downloadable Digital Product' },
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {productTypes.map((product) => (
                <Button
                    key={product.type}
                    onClick={() => onNext({ type: product.type })}
                    className="h-32 flex flex-col items-center justify-center text-center bg-gray-700 hover:bg-gray-600"
                >
                    <product.icon className="w-8 h-8 mb-2" />
                    {product.label}
                </Button>
            ))}
        </div>
    )
}