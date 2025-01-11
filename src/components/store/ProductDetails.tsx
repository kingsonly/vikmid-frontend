'use client'
 
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, ShoppingBag, Edit, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { ProductActivity } from '@/components/store/ProductActivity'
 
export function ProductDetails({ product }) {
    return (
        <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>Product Details</span>
                    <div>
                        <Button variant="outline" size="sm" className="mr-2">
                            <Edit className="w-4 h-4 mr-1" /> Edit
                        </Button>
                        <Button variant="destructive" size="sm">
                            <Trash2 className="w-4 h-4 mr-1" /> Delete
                        </Button>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 mb-4 md:mb-0">
                        <Image
                            src={product.image}
                            alt={product.name}
                            width={300}
                            height={300}
                            className="rounded-lg"
                        />
                    </div>
                    <div className="md:w-2/3 md:pl-6">
                        <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
                        <p className="text-gray-400 mb-4">
                            {product.type === 'digital' ? (
                                <span className="flex items-center">
                                    <Package className="w-5 h-5 mr-2 text-blue-400" /> Digital Product
                                </span>
                            ) : (
                                <span className="flex items-center">
                                    <ShoppingBag className="w-5 h-5 mr-2 text-green-400" /> Physical Product
                                </span>
                            )}
                        </p>
                        <p className="text-xl font-semibold mb-4">${product.price.toFixed(2)}</p>
                        <p className="text-gray-300 mb-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                        <div className="bg-gray-700 p-4 rounded-lg">
                            <h3 className="font-semibold mb-2">Product Stats</h3>
                            <p>Total Sales: {product.sales}</p>
                            <p>Revenue: ${(product.price * product.sales).toFixed(2)}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
                    <ProductActivity productId={product.id} />
                </div>
            </CardContent>
        </Card>
    )
}