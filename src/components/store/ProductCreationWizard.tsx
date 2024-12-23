'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ProductTypeSelector } from '@/components/store/ProductTypeSelector'
import { BasicProductInfo } from '@/components/store/BasicProductInfo'
import { DigitalProductDetails } from '@/components/store/DigitalProductDetails'
import { PhysicalProductDetails } from '@/components/store/PhysicalProductDetails'
import { ProductVariants } from '@/components/store/ProductVariants'
import { UpsellOptions } from '@/components/store/UpsellOptions'
import { DiscountSettings } from '@/components/store/DiscountSettings'

interface ProductCreationWizardProps {
    onCancel: () => void
}

export function ProductCreationWizard({ onCancel }: ProductCreationWizardProps) {
    const [step, setStep] = useState(1)
    const [productData, setProductData] = useState({
        type: '',
        basicInfo: {},
        details: {},
        variants: [],
        upsells: [],
        discounts: {},
    })

    const steps = [
        { component: ProductTypeSelector, title: 'Select Product Type' },
        { component: BasicProductInfo, title: 'Basic Product Information' },
        { component: DigitalProductDetails, title: 'Digital Product Details' },
        { component: PhysicalProductDetails, title: 'Physical Product Details' },
        { component: ProductVariants, title: 'Product Variants' },
        { component: UpsellOptions, title: 'Upsell Options' },
        { component: DiscountSettings, title: 'Discount Settings' },
    ]

    const CurrentStepComponent = steps[step - 1].component

    const handleNext = (stepData: any) => {
        setProductData(prevData => ({ ...prevData, ...stepData }))
        setStep(prevStep => prevStep + 1)
    }

    const handlePrevious = () => {
        setStep(prevStep => prevStep - 1)
    }

    const handleSubmit = () => {
        console.log('Final product data:', productData)
        // Here you would typically send this data to your backend
        onCancel() // Close the wizard
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
        >
            <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-white">
                        Create New Product - Step {step} of {steps.length}
                    </CardTitle>
                    <p className="text-gray-400">{steps[step - 1].title}</p>
                </CardHeader>
                <CardContent>
                    <CurrentStepComponent
                        productData={productData}
                        onNext={handleNext}
                    />
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button onClick={onCancel} variant="ghost">Cancel</Button>
                    <div>
                        {step > 1 && (
                            <Button onClick={handlePrevious} variant="outline" className="mr-2">
                                Previous
                            </Button>
                        )}
                        {step < steps.length ? (
                            <Button onClick={() => setStep(s => s + 1)} className="bg-gradient-to-r from-pink-500 to-purple-500">
                                Next
                            </Button>
                        ) : (
                            <Button onClick={handleSubmit} className="bg-gradient-to-r from-pink-500 to-purple-500">
                                Create Product
                            </Button>
                        )}
                    </div>
                </CardFooter>
            </Card>
        </motion.div>
    )
}