'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BasicInfoStep } from './BasicInfoStep'
import { AvailabilityStep } from './AvailabilityStep'
import { CheckoutContentStep } from './CheckoutContentStep'

interface NewBookingWizardProps {
    onCancel: () => void
}

export function NewBookingWizard({ onCancel }: NewBookingWizardProps) {
    const [step, setStep] = useState(1)
    const [bookingData, setBookingData] = useState({
        basicInfo: {},
        availability: {},
        checkoutContent: {}
    })

    const handleNext = (stepData) => {
        setBookingData(prevData => ({ ...prevData, ...stepData }))
        setStep(prevStep => prevStep + 1)
    }

    const handlePrevious = () => {
        setStep(prevStep => prevStep - 1)
    }

    const handleSubmit = () => {
        console.log('Final booking data:', bookingData)
        // Here you would typically send this data to your backend
        onCancel() // Close the wizard
    }

    return (
        <Card className="bg-gray-800 text-white">
            <CardHeader>
                <CardTitle>Create New Booking - Step {step} of 3</CardTitle>
            </CardHeader>
            <CardContent>
                {step === 1 && <BasicInfoStep onNext={handleNext} />}
                {step === 2 && <AvailabilityStep onNext={handleNext} />}
                {step === 3 && <CheckoutContentStep onNext={handleSubmit} />}
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button onClick={onCancel} variant="ghost">Cancel</Button>
                <div>
                    {step > 1 && <Button onClick={handlePrevious} variant="outline" className="mr-2">Previous</Button>}
                    {step < 3 ? (
                        <Button onClick={() => setStep(s => s + 1)} className="bg-gradient-to-r from-pink-500 to-purple-500">Next</Button>
                    ) : (
                        <Button onClick={handleSubmit} className="bg-gradient-to-r from-pink-500 to-purple-500">Submit</Button>
                    )}
                </div>
            </CardFooter>
        </Card>
    )
}