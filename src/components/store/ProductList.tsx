'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ShoppingBag } from 'lucide-react'
import Image from 'next/image'

export function ProductList({ products, onProductSelect }) {
    return (
        <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
                <CardTitle>Your Products</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((product) => (
                        <Card
                            key={product.id}
                            className="bg-gray-700 border-gray-600 cursor-pointer hover:bg-gray-600 transition-colors"
                            onClick={() => onProductSelect(product)}
                        >
                            <CardContent className="p-4">
                                <div className="flex items-center space-x-4">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        width={64}
                                        height={64}
                                        className="rounded-md"
                                    />
                                    <div>
                                        <h3 className="font-semibold">{product.name}</h3>
                                        <p className="text-sm text-gray-400">${product.price.toFixed(2)}</p>
                                        <div className="flex items-center mt-2">
                                            {product.type === 'digital' ? (
                                                <Package className="w-4 h-4 text-blue-400 mr-1" />
                                            ) : (
                                                <ShoppingBag className="w-4 h-4 text-green-400 mr-1" />
                                            )}
                                            <span className="text-sm text-gray-400">{product.sales} sales</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}