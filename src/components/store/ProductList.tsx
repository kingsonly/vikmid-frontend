'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { jsx } from 'react/jsx-runtime'

export function ProductList({ products, onProductSelect }) {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [type, setType] = useState('digital')
    const [image, setImage] = useState(null)
    const [file, setFile] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        // Validate inputs
        if (price < 0) {
            alert('Price cannot be negative')
            return
        }
        // Create a new product object
        const newProduct = {
            name,
            description,
            price,
            type,
            image,
            file
        }
        // Add the new product to the products array
        // This should be handled by the onProductSelect function
        onProductSelect(newProduct)
        // Reset the form fields
        setName('')
        setDescription('')
        setPrice(0)
        setType('digital')
        setImage(null)
        setFile(null)
        // Close the dialog
        setOpen(false)
    }

    return (
        <div>
            <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                    <CardTitle>Your Products</CardTitle>
                    {/* <DialogTrigger asChild> */}
                    <Button onClick={() => setOpen(true)}>Add Product</Button>
                    {/* </DialogTrigger> */}
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
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="bg-gray-800 text-white">
                    <DialogHeader>
                        <DialogTitle>Add Product</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-4 p-4">
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Input id="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <div>
                                <Label htmlFor="price">Price</Label>
                                <Input id="price" type="number" min={0} value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} />
                            </div>
                            <div>
                                <Label htmlFor="type">Type</Label>
                                <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
                                    <option value="digital">Digital</option>
                                    <option value="physical">Physical</option>
                                </select>
                            </div>
                            Jsx
                            <div>
                                <Label htmlFor="image">Image</Label>
                                <Input id="image" type="file" onChange={(e) => setImage(e.target.files[0])} />
                            </div>
                            <div>
                                <Label htmlFor="file">File (digital products only)</Label>
                                <Input id="file" type="file" onChange={(e) => setFile(e.target.files[0])} />
                            </div>
                            <DialogFooter>
                                <Button type="submit">Add Product</Button>
                                <Button type="button" onClick={() => setOpen(false)}>Cancel</Button>
                            </DialogFooter>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
/*This code completes the product form with fields for image and file uploads, and includes buttons to submit the form or cancel the operation. The form is wrapped in a dialog component that can be opened or closed by clicking the "Add Product" button.*/