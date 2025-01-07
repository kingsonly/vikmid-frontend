'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, ShoppingBag, Plus, BarChart2, DollarSign, Activity } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ProductCreationWizard } from '@/components/store/ProductCreationWizard'
import { ProductList } from '@/components/store/ProductList'
import { ProductDetails } from '@/components/store/ProductDetails'
import { TransactionList } from '@/components/store/TransactionList'
import { ProductActivity } from '@/components/store/ProductActivity'

// Mock data for demonstration
const products = [
  { id: 1, name: 'Digital Course', type: 'digital', price: 99.99, sales: 150, image: '/placeholder.svg?height=100&width=100' },
  { id: 2, name: 'Physical Book', type: 'physical', price: 29.99, sales: 75, image: '/placeholder.svg?height=100&width=100' },
  { id: 3, name: 'Downloadable eBook', type: 'digital', price: 19.99, sales: 200, image: '/placeholder.svg?height=100&width=100' },
]

export default function StoreManagement() {
  const [isCreatingProduct, setIsCreatingProduct] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('products')

  const handleProductSelect = (product) => {
    setSelectedProduct(product)
    setActiveTab('details')
  }

  return (
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
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="products">Products</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="transactions">Transactions</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>
                <TabsContent value="products">
                  <ProductList products={products} onProductSelect={handleProductSelect} />
                </TabsContent>
                <TabsContent value="details">
                  {selectedProduct ? (
                    <ProductDetails product={selectedProduct} />
                  ) : (
                    <Card className="bg-gray-800 border-gray-700">
                      <CardContent className="p-6 text-center text-gray-400">
                        Select a product to view details
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
                <TabsContent value="transactions">
                  <TransactionList productId={selectedProduct?.id} />
                </TabsContent>
                <TabsContent value="analytics">
                  <Card className="bg-gray-800 border-gray-700">
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
                </TabsContent>
              </Tabs>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}