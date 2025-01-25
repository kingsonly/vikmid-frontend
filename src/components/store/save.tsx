'use client'

import React from 'react';
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, ShoppingBag, Plus, BarChart2, DollarSign, Activity } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ProductCreationWizard } from '@/components/store/ProductCreationWizard'
import { ProductList } from '@/components/store/ProductList'
import { TransactionList } from '@/components/store/TransactionList'

// Mock data for demonstration
const products = [
  { id: 1, name: 'Digital Course', type: 'digital', price: 99.99, sales: 150, image: '/placeholder.svg?height=100&width=100' },
  { id: 2, name: 'Physical Book', type: 'physical', price: 29.99, sales: 75, image: '/placeholder.svg?height=100&width=100' },
  { id: 3, name: 'Downloadable eBook', type: 'digital', price: 19.99, sales: 200, image: '/placeholder.svg?height=100&width=100' },
]

export default function StoreManagement() {
  const [isCreatingProduct, setIsCreatingProduct] = useState(false)
  const [activeTab, setActiveTab] = useState('products')

  return (
    <>
      <div className="min-h-screen w-full bg-gray-900 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
              Store Management
            </h1>
            <Button
              onClick={() => setIsCreatingProduct(true)}
              className="bg-gradient-to-r from-pink-500 to-purple-500"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Product
            </Button>
          </div>

          <Card className="bg-gray-800 border-gray-700 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart2 className="w-6 h-6 mr-2" />
                Store Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Total Revenue</h3>
                      <DollarSign className="w-5 h-5 text-green-400" />
                    </div>
                    <p className="text-2xl font-bold mt-2">$12,345.67</p>
                  </CardContent>
                </Card>
                <Card className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Total Sales</h3>
                      <ShoppingBag className="w-5 h-5 text-blue-400" />
                    </div>
                    <p className="text-2xl font-bold mt-2">425</p>
                  </CardContent>
                </Card>
                <Card className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Active Products</h3>
                      <Package className="w-5 h-5 text-purple-400" />
                    </div>
                    <p className="text-2xl font-bold mt-2">{products.length}</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <AnimatePresence>
            {isCreatingProduct ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <ProductCreationWizard onCancel={() => setIsCreatingProduct(false)} />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Tabs value={activeTab} onValueChange={setActiveTab} className                className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="products">Products</TabsTrigger>
                    <TabsTrigger value="transactions">Transactions</TabsTrigger>
                  </TabsList>
                  <TabsContent value="products">
                    <ProductList products={products} />
                  </TabsContent>
                  <TabsContent value="transactions">
                    <TransactionList />
                  </TabsContent>
                </Tabs>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}














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